import { describe, expect, it } from "vitest";

import {
  formatBookingDisplayValue,
  formatBookingLabel,
} from "./booking-display";

describe("booking display helpers", () => {
  it("formats empty booking values with a fallback", () => {
    expect(formatBookingDisplayValue(null, "Pending")).toBe("Pending");
    expect(formatBookingDisplayValue("", "Pending")).toBe("Pending");
    expect(formatBookingDisplayValue("stripe", "Pending")).toBe("stripe");
  });

  it("formats backend enum labels for display", () => {
    expect(formatBookingLabel("new_booking", "Pending")).toBe("New Booking");
    expect(formatBookingLabel("payment-status", "Pending")).toBe("Payment Status");
  });
});
