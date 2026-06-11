import { describe, expect, it } from "vitest";

import { normalizeCustomerSupportRequests } from "./customer-support";

describe("normalizeCustomerSupportRequests", () => {
  it("supports common support list response shapes", () => {
    expect(
      normalizeCustomerSupportRequests({
        data: [{ id: 1, name: "A", message: "Need help" }],
      }),
    ).toHaveLength(1);
    expect(
      normalizeCustomerSupportRequests([
        { ticket_id: "T-1", description: "Need help" },
      ]),
    ).toHaveLength(1);
    expect(
      normalizeCustomerSupportRequests({
        requests: [{ support_id: 3, body: "Need help" }],
      }),
    ).toHaveLength(1);
  });

  it("maps fallback fields safely", () => {
    expect(
      normalizeCustomerSupportRequests({
        tickets: [
          {
            ticket_id: "T-42",
            customer_name: "ReactIf User",
            customer_email: "user@example.com",
            contact_number: "+33123456789",
            category: "Signalétique",
            title: "Project question",
            body: "Can you help?",
            ticket_status: "in_progress",
            submitted_at: "2026-06-11T12:00:00Z",
          },
        ],
      }),
    ).toEqual([
      {
        id: "T-42",
        name: "ReactIf User",
        email: "user@example.com",
        phone: "+33123456789",
        service: "Signalétique",
        subject: "Project question",
        message: "Can you help?",
        status: "in_progress",
        source: "",
        created_at: "2026-06-11T12:00:00Z",
      },
    ]);
  });
});
