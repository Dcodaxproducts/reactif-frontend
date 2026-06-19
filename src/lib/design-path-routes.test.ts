import { describe, expect, it } from "vitest";

import { buildDesignPathHref } from "./design-path-routes";

describe("design path routes", () => {
  it("keeps the current booking flow for customers with a design", () => {
    expect(
      buildDesignPathHref({
        pathType: "have-design",
        categoryId: 6,
        subcategoryId: 79,
        subcategoryName: "Test category",
        subcategorySlug: "test-category",
        categorySlug: "signaletique",
        serviceId: 123,
      }),
    ).toBe(
      "/paint-protection/6?path=have-design&categoryId=6&from=design-path-modal&subcategoryId=79&subcategoryName=Test+category&subcategorySlug=test-category&categorySlug=signaletique&serviceId=123",
    );
  });

  it("routes customers who need a designer to designer selection", () => {
    expect(
      buildDesignPathHref({
        pathType: "need-designer",
        categoryId: 6,
        subcategoryId: 79,
        subcategoryName: "Test category",
        subcategorySlug: "test-category",
        categorySlug: "signaletique",
        serviceId: 123,
      }),
    ).toBe(
      "/all-vendor-services?path=need-designer&categoryId=6&from=design-path-modal&subcategoryId=79&subcategoryName=Test+category&subcategorySlug=test-category&categorySlug=signaletique&serviceId=123",
    );
  });

  it("does not build routes without a category id", () => {
    expect(
      buildDesignPathHref({
        pathType: "have-design",
        categoryId: null,
        serviceId: 123,
      }),
    ).toBeNull();
  });
});
