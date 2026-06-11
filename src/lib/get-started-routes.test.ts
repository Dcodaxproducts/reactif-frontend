import { describe, expect, it } from "vitest";

import {
  AUTHENTICATED_GET_STARTED_ROUTE,
  GUEST_GET_STARTED_ROUTE,
  getStartedRoute,
} from "./get-started-routes";

describe("get started routes", () => {
  it("keeps guests on the login entry point", () => {
    expect(getStartedRoute(false)).toBe(GUEST_GET_STARTED_ROUTE);
    expect(GUEST_GET_STARTED_ROUTE).toBe("/login");
  });

  it("sends authenticated customers to their booking workspace", () => {
    expect(getStartedRoute(true)).toBe(AUTHENTICATED_GET_STARTED_ROUTE);
    expect(AUTHENTICATED_GET_STARTED_ROUTE).toBe("/order/management");
  });
});
