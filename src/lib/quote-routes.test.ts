import { describe, expect, it } from "vitest";

import { PORTFOLIO_ROUTE, QUOTE_REQUEST_ROUTE } from "./quote-routes";
import { buildLoginRoute } from "./auth-routes";

describe("quote routes", () => {
  it("keeps quote and portfolio CTAs on separate customer routes", () => {
    expect(QUOTE_REQUEST_ROUTE).toBe("/contact?intent=quote#contact");
    expect(PORTFOLIO_ROUTE).toBe("/portfolio");
  });

  it("supports login redirect back to the quote flow", () => {
    expect(buildLoginRoute(QUOTE_REQUEST_ROUTE)).toBe(
      "/login?redirect=%2Fcontact%3Fintent%3Dquote%23contact",
    );
  });
});
