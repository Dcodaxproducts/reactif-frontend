import { describe, expect, it } from "vitest";

import { buildCancelBookingPayload } from "./cancel-booking-payload";
import type { Booking } from "@/types/bookings";

const booking: Booking = {
  id: 105,
  service_id: 123,
  status: "new_booking",
  created_at: "2026-06-17T09:55:02.000000Z",
  address: "Ghori Town Main Road",
  latitude: "33.61343400",
  longitude: "73.13166000",
  datetime: "2026-06-17T04:24:18.000000Z",
  total_amount: "10.00",
};

describe("cancel booking payload", () => {
  it("includes the fields required by the booking endpoint", () => {
    expect(buildCancelBookingPayload(booking, "Canceled by customer")).toEqual({
      booking_id: 105,
      cancellation_reason: "Canceled by customer",
      service_id: 123,
      address: "Ghori Town Main Road",
      latitude: "33.61343400",
      longitude: "73.13166000",
      datetime: "2026-06-17T04:24:18.000000Z",
      status: "canceled",
    });
  });

  it("falls back to nested service id and schedule datetime", () => {
    expect(
      buildCancelBookingPayload(
        {
          ...booking,
          service_id: null,
          service: { id: 124, name: "Wrap" },
          datetime: null,
          schedule_datetime: "2026-06-18T04:24:18.000000Z",
        },
        "Canceled by customer",
      ),
    ).toMatchObject({
      service_id: 124,
      datetime: "2026-06-18T04:24:18.000000Z",
    });
  });

  it("returns null when required API fields are missing", () => {
    expect(
      buildCancelBookingPayload(
        {
          ...booking,
          latitude: null,
        },
        "Canceled by customer",
      ),
    ).toBeNull();
  });
});
