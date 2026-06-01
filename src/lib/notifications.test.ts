import { describe, expect, it } from "vitest";

import { normalizeNotification, normalizeNotifications } from "./notifications";

describe("notification helpers", () => {
  it("normalizes notification fields", () => {
    expect(
      normalizeNotification({
        id: 1,
        title: "Booking update",
        body: "Accepted",
        type: "booking",
        notification_data: { booking_id: 10 },
        is_read: "1",
        created_at: "2026-06-01",
        image: "image.png",
      }),
    ).toMatchObject({
      id: "1",
      title: "Booking update",
      message: "Accepted",
      type: "booking",
      is_read: true,
      image: "image.png",
    });
  });

  it("normalizes list response shapes", () => {
    expect(normalizeNotifications({ data: [{ id: 1 }] })).toHaveLength(1);
    expect(normalizeNotifications({ notifications: [{ id: 2 }] })).toHaveLength(1);
  });
});
