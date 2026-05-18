import type { Service, ServiceFormValues } from "@/types/component-props";

export const buildInitialServiceValues = (
  service?: Service | null,
): ServiceFormValues => {
  if (!service?.fields) return {};

  return service.fields.reduce<ServiceFormValues>((values, field) => {
    values[field.field_name] = field.default_value || "";
    return values;
  }, {});
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
  const formData = new FormData();
  const isSchedule = true;

  formData.append("service_id", String(service.id));
  formData.append("address", "Rawalpindi, Pakistan");
  formData.append("latitude", "33.5651");
  formData.append("longitude", "73.0169");
  formData.append("datetime", new Date().toISOString());
  formData.append("status", "new_booking");
  formData.append("is_schedule", isSchedule ? "1" : "0");
  formData.append("distance", "5.5");
  formData.append("base_fare", String(service.price || 10));
  formData.append("subtotal", String(service.price || 50));
  formData.append("extra_charges_amount", "5");
  formData.append("total_amount", String((service.price || 50) + 5));
  formData.append("payment_type", "cash");
  formData.append("booking_type", "without_bidding");

  if (designerId) formData.append("designer_id", designerId);
  if (isSchedule)
    formData.append("schedule_datetime", new Date().toISOString());

  formData.append(
    "service_data",
    JSON.stringify({
      service_name: service.name,
      category: activeCategory,
    }),
  );

  const formattedFieldResponses =
    service.fields?.map((field) => {
      const value = formValues[field.field_name];

      if (field.input_type === "file" && value instanceof File) {
        formData.append(`file_${field.id}`, value);
      }

      return {
        field_id: field.id,
        field_name: field.field_name,
        field_type: field.input_type,
        lable: field.label,
        value:
          field.input_type === "file"
            ? value instanceof File
              ? `file_${field.id}`
              : null
            : Array.isArray(value)
              ? value.join(", ")
              : (value ?? ""),
      };
    }) || [];

  formData.append("field_responses", JSON.stringify(formattedFieldResponses));

  return formData;
};
