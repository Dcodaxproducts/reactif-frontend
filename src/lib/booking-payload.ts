import { getBookingDraftFile } from "./booking-draft";
import type { BookingDraft } from "@/types/bookings";

const appendIfPresent = (formData: FormData, key: string, value: string) => {
  if (value.trim() !== "") {
    formData.append(key, value);
  }
};

export const buildBookingFormDataFromDraft = (draft: BookingDraft) => {
  const formData = new FormData();
  const bookingDatetime = draft.booking_datetime || new Date().toISOString();
  const scheduleDatetime = draft.schedule_datetime || bookingDatetime;

  formData.append("service_id", String(draft.selected_service.id));
  appendIfPresent(formData, "address", draft.address);
  appendIfPresent(formData, "latitude", draft.latitude);
  appendIfPresent(formData, "longitude", draft.longitude);
  formData.append("datetime", bookingDatetime);
  formData.append("booking_datetime", bookingDatetime);
  formData.append("status", "new_booking");
  formData.append("is_schedule", scheduleDatetime ? "1" : "0");
  appendIfPresent(formData, "distance", draft.distance);
  appendIfPresent(formData, "base_fare", draft.subtotal);
  appendIfPresent(formData, "subtotal", draft.subtotal);
  appendIfPresent(formData, "extra_charges_amount", draft.extra_charges_amount);
  appendIfPresent(formData, "total_amount", draft.total_amount);
  appendIfPresent(formData, "payment_type", draft.payment_type);
  appendIfPresent(formData, "booking_type", draft.booking_type);
  appendIfPresent(formData, "schedule_datetime", scheduleDatetime);

  if (draft.selected_designer_id) {
    formData.append("designer_id", draft.selected_designer_id);
  }

  formData.append(
    "service_data",
    JSON.stringify({
      service_name: draft.selected_service.name,
      category: draft.selected_category,
      subcategory: draft.selected_subcategory,
      design_path: draft.selected_design_path,
    }),
  );
  formData.append(
    "field_responses",
    JSON.stringify(draft.dynamic_field_responses),
  );

  draft.uploaded_file_references.forEach(({ key }) => {
    const file = getBookingDraftFile(key);
    if (file) {
      formData.append(key, file);
    }
  });

  return formData;
};

export const getMissingBookingLocationFields = (draft: BookingDraft | null) => {
  if (!draft) return ["booking draft"];

  const missingFields: string[] = [];

  if (draft.address.trim() === "") missingFields.push("address");
  if (draft.latitude.trim() === "") missingFields.push("latitude");
  if (draft.longitude.trim() === "") missingFields.push("longitude");

  return missingFields;
};
