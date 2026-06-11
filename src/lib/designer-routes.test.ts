import { describe, expect, it } from "vitest";

import {
  buildDesignerPortfolioHref,
  buildDesignerSelectHref,
  getDesignerSelectionFallbackHref,
} from "./designer-routes";

describe("designer route helpers", () => {
  const queryString =
    "path=need-designer&categoryId=6&subcategoryId=9&serviceId=42&categorySlug=signaletique&from=design-path-modal";

  it("preserves booking context for designer portfolio links", () => {
    expect(
      buildDesignerPortfolioHref({ designerId: 12, queryString }),
    ).toBe(
      "/designer/12?path=need-designer&categoryId=6&subcategoryId=9&serviceId=42&categorySlug=signaletique&from=design-path-modal",
    );
  });

  it("preserves booking context for designer selection links", () => {
    expect(buildDesignerSelectHref({ designerId: 12, queryString })).toBe(
      "/paint-protection/6?path=need-designer&categoryId=6&subcategoryId=9&serviceId=42&categorySlug=signaletique&from=design-path-modal&designerId=12",
    );
  });

  it("does not build select routes with null or undefined category IDs", () => {
    expect(
      buildDesignerSelectHref({
        designerId: 12,
        queryString: "categoryId=null&serviceId=42",
      }),
    ).toBeNull();
    expect(
      buildDesignerSelectHref({
        designerId: 12,
        queryString: "categoryId=undefined&serviceId=42",
      }),
    ).toBeNull();
  });

  it("builds a safe fallback to category selection", () => {
    expect(
      getDesignerSelectionFallbackHref(
        "categoryId=6&categorySlug=signaletique&subcategoryId=9",
      ),
    ).toBe("/subcategories?id=6&slug=signaletique&subcategoryId=9");
  });
});
