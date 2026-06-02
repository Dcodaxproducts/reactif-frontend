import { describe, expect, it } from "vitest";

import {
  buildOrderDetailItems,
  buildOrderFieldGroups,
  buildOrderPriceRows,
  buildPersonalInfoFields,
  getOrderTotalLabel,
} from "./order-address-summary";
import type { BookingDraft } from "@/types/bookings";

const draft: BookingDraft = {
  selected_service: {
    id: 123,
    name: "Test Service",
    price: 10,
    description: "Service description",
    image: "image.jpg",
    field_count: 3,
  },
  selected_category: "Signaletique",
  selected_subcategory: { id: 79, name: "Test category" },
  selected_design_path: "have-design",
  selected_designer_id: null,
  dynamic_field_responses: [
    {
      field_id: 1,
      field_name: "full_name",
      field_type: "text",
      label: "Full Name",
      value: "Jane Customer",
    },
    {
      field_id: 2,
      field_name: "email_address",
      field_type: "email",
      label: "Email Address",
      value: "jane@example.com",
    },
    {
      field_id: 3,
      field_name: "phone_number",
      field_type: "tel",
      label: "Phone Number",
      value: "+15551234567",
    },
  ],
  uploaded_file_references: [],
  address: "",
  latitude: "",
  longitude: "",
  booking_datetime: "2026-06-02T00:00:00.000Z",
  schedule_datetime: "2026-06-02T00:00:00.000Z",
  distance: "",
  subtotal: "10",
  extra_charges_amount: "0",
  total_amount: "10",
  payment_type: "pending",
  booking_type: "direct",
};

describe("order address summary", () => {
  it("builds dynamic configuration and pricing from booking draft", () => {
    expect(buildOrderFieldGroups(draft)).toEqual([
      { title: "Full Name", options: ["Jane Customer"] },
      { title: "Email Address", options: ["jane@example.com"] },
      { title: "Phone Number", options: ["+15551234567"] },
    ]);
    expect(buildOrderPriceRows(draft)).toEqual([
      { label: "Service Price", value: "$10.00" },
      { label: "Extra Charges", value: "$0.00" },
    ]);
    expect(getOrderTotalLabel(draft)).toBe("$10.00");
  });

  it("builds service context and personal fields", () => {
    expect(buildOrderDetailItems(draft)).toEqual([
      { title: "Category", description: "Signaletique" },
      { title: "Subcategory", description: "Test category" },
      { title: "Service", description: "Test Service" },
      { title: "Configuration fields", description: "3 captured" },
    ]);
    expect(buildPersonalInfoFields(draft)).toEqual([
      { label: "Full Name", defaultValue: "Jane Customer" },
      { label: "Email Address", defaultValue: "jane@example.com" },
      { label: "Phone Number", defaultValue: "+15551234567" },
    ]);
  });
});
