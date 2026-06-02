import type { BookingDraft, BookingFieldResponse } from "@/types/bookings";
import type {
  EditableInputFieldProps,
  OptionGroupData,
  OrderPriceRowData,
  ProtectionFeatureData,
} from "@/types/component-props";
import { formatCurrency } from "./currency";

type TranslationResolver = (
  key: string,
  values?: Record<string, string | number>,
) => string;

const isEmptyValue = (value: BookingFieldResponse["value"]) =>
  value === null || value === undefined || String(value).trim() === "";

const getFieldLabel = (field: BookingFieldResponse) =>
  field.label ?? field.lable ?? field.field_name.replaceAll("_", " ");

const getFieldValue = (
  field: BookingFieldResponse,
  draft: BookingDraft,
  translate?: TranslationResolver,
) => {
  if (!isEmptyValue(field.value)) return String(field.value);

  const fileReference = draft.uploaded_file_references.find(
    ({ fieldName }) => fieldName === field.field_name,
  );

  return fileReference?.name ?? translate?.("order.notProvided") ?? "Not provided";
};

export const buildOrderFieldGroups = (
  draft: BookingDraft | null,
  translate?: TranslationResolver,
): OptionGroupData[] => {
  if (!draft) return [];

  return draft.dynamic_field_responses.map((field) => ({
    title: getFieldLabel(field),
    options: [getFieldValue(field, draft, translate)],
  }));
};

export const buildOrderDetailItems = (
  draft: BookingDraft | null,
  translate?: TranslationResolver,
): ProtectionFeatureData[] => {
  if (!draft) return [];

  const detailItems: ProtectionFeatureData[] = [
    {
      title: translate?.("payment.category") ?? "Category",
      description:
        draft.selected_category ??
        translate?.("payment.notSelected") ??
        "Not selected",
    },
    {
      title: translate?.("payment.subcategory") ?? "Subcategory",
      description:
        draft.selected_subcategory?.name ??
        translate?.("payment.notSelected") ??
        "Not selected",
    },
    {
      title: translate?.("payment.service") ?? "Service",
      description: draft.selected_service.name,
    },
  ];

  if (draft.selected_service.field_count !== undefined) {
    detailItems.push({
      title: translate?.("order.configurationFields") ?? "Configuration fields",
      description:
        translate?.("order.capturedCount", {
          count: draft.selected_service.field_count,
        }) ?? `${draft.selected_service.field_count} captured`,
    });
  }

  return detailItems;
};

export const buildOrderPriceRows = (
  draft: BookingDraft | null,
  translate?: TranslationResolver,
): OrderPriceRowData[] => {
  if (!draft) return [];

  return [
    {
      label: translate?.("order.servicePrice") ?? "Service Price",
      value: formatCurrency(draft.selected_service.price ?? draft.subtotal),
    },
    {
      label: translate?.("order.extraCharges") ?? "Extra Charges",
      value: formatCurrency(draft.extra_charges_amount),
    },
  ];
};

export const getOrderTotalLabel = (draft: BookingDraft | null) => {
  if (!draft) return formatCurrency(0);

  return formatCurrency(draft.total_amount || draft.selected_service.price);
};

const fieldMatches = (field: BookingFieldResponse, patterns: string[]) => {
  const normalized = `${field.field_name} ${getFieldLabel(field)}`.toLowerCase();
  return patterns.some((pattern) => normalized.includes(pattern));
};

const getDraftFieldValue = (draft: BookingDraft | null, patterns: string[]) => {
  if (!draft) return "";

  const matchedField = draft.dynamic_field_responses.find((field) =>
    fieldMatches(field, patterns),
  );

  return matchedField ? getFieldValue(matchedField, draft) : "";
};

export const buildPersonalInfoFields = (
  draft: BookingDraft | null,
): EditableInputFieldProps[] => [
  {
    label: "Full Name",
    labelKey: "order.fullName",
    defaultValue: getDraftFieldValue(draft, ["full_name", "full name", "name"]),
  },
  {
    label: "Email Address",
    labelKey: "order.emailAddress",
    defaultValue: getDraftFieldValue(draft, ["email"]),
  },
  {
    label: "Phone Number",
    labelKey: "order.phoneNumber",
    defaultValue: getDraftFieldValue(draft, ["phone", "tel"]),
  },
];
