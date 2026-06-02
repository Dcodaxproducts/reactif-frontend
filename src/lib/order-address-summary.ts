import type { BookingDraft, BookingFieldResponse } from "@/types/bookings";
import type {
  EditableInputFieldProps,
  OptionGroupData,
  OrderPriceRowData,
  ProtectionFeatureData,
} from "@/types/component-props";
import { formatCurrency } from "./currency";

const isEmptyValue = (value: BookingFieldResponse["value"]) =>
  value === null || value === undefined || String(value).trim() === "";

const getFieldLabel = (field: BookingFieldResponse) =>
  field.label ?? field.lable ?? field.field_name.replaceAll("_", " ");

const getFieldValue = (
  field: BookingFieldResponse,
  draft: BookingDraft,
) => {
  if (!isEmptyValue(field.value)) return String(field.value);

  const fileReference = draft.uploaded_file_references.find(
    ({ fieldName }) => fieldName === field.field_name,
  );

  return fileReference?.name ?? "Not provided";
};

export const buildOrderFieldGroups = (
  draft: BookingDraft | null,
): OptionGroupData[] => {
  if (!draft) return [];

  return draft.dynamic_field_responses.map((field) => ({
    title: getFieldLabel(field),
    options: [getFieldValue(field, draft)],
  }));
};

export const buildOrderDetailItems = (
  draft: BookingDraft | null,
): ProtectionFeatureData[] => {
  if (!draft) return [];

  const detailItems: ProtectionFeatureData[] = [
    {
      title: "Category",
      description: draft.selected_category ?? "Not selected",
    },
    {
      title: "Subcategory",
      description: draft.selected_subcategory?.name ?? "Not selected",
    },
    {
      title: "Service",
      description: draft.selected_service.name,
    },
  ];

  if (draft.selected_service.field_count !== undefined) {
    detailItems.push({
      title: "Configuration fields",
      description: `${draft.selected_service.field_count} captured`,
    });
  }

  return detailItems;
};

export const buildOrderPriceRows = (
  draft: BookingDraft | null,
): OrderPriceRowData[] => {
  if (!draft) return [];

  return [
    {
      label: "Service Price",
      value: formatCurrency(draft.selected_service.price ?? draft.subtotal),
    },
    {
      label: "Extra Charges",
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
    defaultValue: getDraftFieldValue(draft, ["full_name", "full name", "name"]),
  },
  {
    label: "Email Address",
    defaultValue: getDraftFieldValue(draft, ["email"]),
  },
  {
    label: "Phone Number",
    defaultValue: getDraftFieldValue(draft, ["phone", "tel"]),
  },
];
