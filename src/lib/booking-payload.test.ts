import { describe, expect, it } from "vitest";

import {
  buildBookingFormDataFromDraft,
  getMissingBookingLocationFields,
} from "./booking-payload";
import type { BookingDraft } from "@/types/bookings";

const draft: BookingDraft = {
  selected_service: { id: 3, name: "Detail", price: 75 },
  selected_category: "Care",
  selected_subcategory: { id: 4, name: "Interior" },
  selected_design_path: "Care",
  selected_designer_id: null,
  dynamic_field_responses: [
    { field_id: 7, field_name: "notes", field_type: "text", value: "clean" },
    { field_id: 8, field_name: "image", field_type: "file", value: "file_8" },
  ],
  uploaded_file_references: [
    {
      fieldName: "image",
      fieldId: 8,
      key: "file_8",
      name: "image.png",
      type: "image/png",
      size: 50,
    },
  ],
  address: "Customer location",
  latitude: "40.1",
  longitude: "-70.2",
  booking_datetime: "2026-06-01T00:00:00.000Z",
  schedule_datetime: "2026-06-02T00:00:00.000Z",
  distance: "3.5",
  subtotal: "75",
  extra_charges_amount: "0",
  total_amount: "75",
  payment_type: "pending",
  booking_type: "direct",
};

describe("booking payload helpers", () => {
  it("builds booking FormData from draft", () => {
    const formData = buildBookingFormDataFromDraft(draft);

    expect(formData.get("service_id")).toBe("3");
    expect(formData.get("address")).toBe("Customer location");
    expect(formData.get("total_amount")).toBe("75");
  });

  it("preserves dynamic field responses", () => {
    const formData = buildBookingFormDataFromDraft(draft);
    const responses = JSON.parse(String(formData.get("field_responses"))) as
      | Array<{ field_name: string; value: string }>
      | null;

    expect(responses?.[0]).toMatchObject({
      field_name: "notes",
      value: "clean",
    });
  });

  it("preserves file field keys", () => {
    const formData = buildBookingFormDataFromDraft(draft);
    const responses = JSON.parse(String(formData.get("field_responses"))) as
      | Array<{ field_name: string; value: string }>
      | null;

    expect(responses?.[1]).toMatchObject({
      field_name: "image",
      value: "file_8",
    });
  });

  it("reports missing booking location fields", () => {
    expect(getMissingBookingLocationFields(draft)).toEqual([]);
    expect(
      getMissingBookingLocationFields({
        ...draft,
        address: "",
        latitude: "",
        longitude: "",
      }),
    ).toEqual(["address", "latitude", "longitude"]);
    expect(getMissingBookingLocationFields(null)).toEqual(["booking draft"]);
  });
});
