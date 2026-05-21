import { getZodFieldErrors } from "@/lib/zod-errors";
import type {
  Service,
  ServiceFormErrors,
  ServiceFormValue,
  ServiceFormValues,
} from "@/types/component-props";
import { buildServiceValidationSchema } from "@/validations/bookings";

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

export const buildBookingFormData = ({
  service,
  activeCategory,
  formValues,
  designerId,
}: {
  service: Service;
  activeCategory: string | null;
  formValues: ServiceFormValues;
  designerId?: string | null;
}) => {
  const { id, price, name, fields } = service;
  const formData = new FormData();
  const isSchedule = true;
  const baseFare = price ?? 10;
  const subtotal = price ?? 50;

  formData.append("service_id", String(id));
  formData.append("address", "Rawalpindi, Pakistan");
  formData.append("latitude", "33.5651");
  formData.append("longitude", "73.0169");
  formData.append("datetime", new Date().toISOString());
  formData.append("status", "new_booking");
  formData.append("is_schedule", isSchedule ? "1" : "0");
  formData.append("distance", "5.5");
  formData.append("base_fare", String(baseFare));
  formData.append("subtotal", String(subtotal));
  formData.append("extra_charges_amount", "5");
  formData.append("total_amount", String(subtotal + 5));
  formData.append("payment_type", "cash");
  formData.append("booking_type", "without_bidding");

  if (designerId) formData.append("designer_id", designerId);
  if (isSchedule)
    formData.append("schedule_datetime", new Date().toISOString());

  formData.append(
    "service_data",
    JSON.stringify({
      service_name: name,
      category: activeCategory,
    }),
  );

  const formattedFieldResponses = fields.map((field) => {
    const { id: fieldId, field_name, input_type, label } = field;
    const value = formValues[field_name];
    const fileKey = `file_${fieldId}`;
    const isFileInput = input_type === "file";

    if (isFileInput && value instanceof File) {
      formData.append(fileKey, value);
    }

    return {
      field_id: fieldId,
      field_name,
      field_type: input_type,
      lable: label,
      value: isFileInput
        ? value instanceof File
          ? fileKey
          : null
        : Array.isArray(value)
          ? value.join(", ")
          : (value ?? ""),
    };
  });

  formData.append("field_responses", JSON.stringify(formattedFieldResponses));

  return formData;
};
