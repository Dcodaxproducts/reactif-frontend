import { describe, expect, it } from "vitest";

import {
  formatBookingStatusLabel,
  getBookingStatusProgress,
} from "./booking-status";

describe("booking status helpers", () => {
  it("maps supported tracking statuses", () => {
    expect(getBookingStatusProgress("arriving")).toBeGreaterThan(0);
    expect(getBookingStatusProgress("arrived")).toBeGreaterThan(0);
    expect(getBookingStatusProgress("in_progress")).toBeGreaterThan(0);
    expect(getBookingStatusProgress("ready_to_pickup")).toBeGreaterThan(0);
    expect(getBookingStatusProgress("picked_up")).toBeGreaterThan(0);
  });

  it("formats status labels", () => {
    expect(formatBookingStatusLabel("ready_to_pickup")).toBe("Ready To Pickup");
  });
});
