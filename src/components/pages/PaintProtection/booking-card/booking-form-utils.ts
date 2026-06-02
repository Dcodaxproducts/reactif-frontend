import { getZodFieldErrors } from "@/lib/zod-errors";
import { rememberBookingDraftFile } from "@/lib/booking-draft";
import { buildBookingFormDataFromDraft } from "@/lib/booking-payload";
import type {
  BookingDraft,
  BookingDraftFileReference,
} from "@/types/bookings";
import type {
  Service,
  ServiceFormErrors,
  ServiceFormValue,
  ServiceFormValues,
} from "@/types/component-props";
import {
  buildServiceValidationSchema,
  isFileValue,
} from "@/validations/bookings";

const buildInitialServiceValue = ({
  input_type,
  default_value,
}: Pick<Service["fields"][number], "input_type" | "default_value">): ServiceFormValue => {
  if (input_type === "checkbox") return [];
  if (input_type === "file") return null;

  return default_value ?? "";
};

export const buildInitialServiceValues = (
  service?: Service | null,
): ServiceFormValues => {
  const { fields } = service ?? {};

  if (!fields) return {};

  return fields.reduce<ServiceFormValues>((values, field) => {
    const { field_name, input_type, default_value } = field;

    values[field_name] = buildInitialServiceValue({
      input_type,
      default_value,
    });
    return values;
  }, {});
};

export const validateServiceForm = (
  service: Service | null | undefined,
  values: ServiceFormValues,
): { isValid: boolean; errors: ServiceFormErrors } => {
  const schema = buildServiceValidationSchema(service);

  if (!schema) {
    return { isValid: true, errors: {} };
  }

  const result = schema.safeParse(values);

  if (result.success) {
    return { isValid: true, errors: {} };
  }

  return {
    isValid: false,
    errors: getZodFieldErrors(result.error),
  };
};

export const buildBookingFormData = ({ draft }: { draft: BookingDraft }) =>
  buildBookingFormDataFromDraft(draft);

export const buildBookingDraft = ({
  service,
  activeCategory,
  parentCategory,
  formValues,
  designerId,
}: {
  service: Service;
  activeCategory: string | null;
  parentCategory?: string | null;
  formValues: ServiceFormValues;
  designerId?: string | null;
}): BookingDraft => {
  const { id, price, name, fields } = service;
  const subtotal = price ?? 0;
  const bookingDatetime = new Date().toISOString();
  const uploadedFileReferences: BookingDraftFileReference[] = [];

  const formattedFieldResponses = fields.map((field) => {
    const { id: fieldId, field_name, input_type, label } = field;
    const value = formValues[field_name];
    const fileKey = `file_${fieldId}`;
    const isFileInput = input_type === "file";

    const fileValue = isFileValue(value) ? value : null;

    if (isFileInput && fileValue) {
      rememberBookingDraftFile(fileKey, fileValue);
      uploadedFileReferences.push({
        fieldName: field_name,
        fieldId,
        key: fileKey,
        name: fileValue.name,
        type: fileValue.type,
        size: fileValue.size,
      });
    }

    return {
      field_id: fieldId,
      field_name,
      field_type: input_type,
      lable: label,
      value: isFileInput
        ? fileValue
          ? fileKey
          : null
        : Array.isArray(value)
          ? value.join(", ")
          : isFileValue(value)
            ? value.name
            : (value ?? ""),
    };
  });

  return {
    selected_service: {
      id,
      name,
      price,
      description: service.description,
      image: service.service_image,
      field_count: fields.length,
    },
    selected_category: parentCategory ?? activeCategory,
    selected_subcategory: service.sub_category_id
      ? { id: service.sub_category_id, name: activeCategory }
      : null,
    selected_design_path: activeCategory,
    selected_designer_id: designerId ?? null,
    dynamic_field_responses: formattedFieldResponses,
    uploaded_file_references: uploadedFileReferences,
    address: "",
    latitude: "",
    longitude: "",
    booking_datetime: bookingDatetime,
    schedule_datetime: bookingDatetime,
    distance: "",
    subtotal: String(subtotal),
    extra_charges_amount: "0",
    total_amount: String(subtotal),
    payment_type: "pending",
    booking_type: "direct",
  };
};
