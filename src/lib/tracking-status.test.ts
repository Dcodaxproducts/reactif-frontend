import { describe, expect, it } from "vitest";

import {
  getTrackingStageFromStatus,
  normalizeTrackingStatus,
} from "./tracking-status";

describe("tracking status helpers", () => {
  it("normalizes backend status values safely", () => {
    expect(normalizeTrackingStatus("Ready To Pickup")).toBe("ready_to_pickup");
    expect(normalizeTrackingStatus("IN-PRODUCTION")).toBe("in_production");
    expect(normalizeTrackingStatus(" livré ")).toBe("livre");
  });

  it("maps known backend statuses to customer tracking stages", () => {
    expect(getTrackingStageFromStatus("new_booking")).toBe("pending");
    expect(getTrackingStageFromStatus("processing")).toBe("in_production");
    expect(getTrackingStageFromStatus("ready_to_pickup")).toBe("quality_check");
    expect(getTrackingStageFromStatus("picked_up")).toBe("shipped");
    expect(getTrackingStageFromStatus("completed")).toBe("delivered");
  });

  it("keeps unknown statuses safe", () => {
    expect(getTrackingStageFromStatus("vendor-review-needed")).toBe("pending");
    expect(getTrackingStageFromStatus(null)).toBe("pending");
  });
});
