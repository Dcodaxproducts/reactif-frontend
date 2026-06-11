import { describe, expect, it } from "vitest";

import { API_ENDPOINTS, joinApiPath } from "./api-endpoints";

describe("API_ENDPOINTS", () => {
  it("keeps canonical endpoint names", () => {
    expect(API_ENDPOINTS.category).toBe("categories");
    expect(API_ENDPOINTS.service).toBe("services");
    expect(API_ENDPOINTS.bookingDetail).toBe("booking-detail");
    expect(API_ENDPOINTS.paymentGatewayList).toBe("payment-gateway-list");
    expect(API_ENDPOINTS.messageSend).toBe("message/send");
    expect(API_ENDPOINTS.customerSupportSave).toBe("customersupport-save");
  });

  it("joins API paths without leading slashes", () => {
    expect(joinApiPath("/auth/login")).toBe("auth/login");
    expect(joinApiPath("support/faqs")).toBe("support/faqs");
  });
});
