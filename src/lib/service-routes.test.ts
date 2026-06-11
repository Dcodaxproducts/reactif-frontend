import { describe, expect, it } from "vitest";

import { buildServiceDetailHref, buildServiceFlowHref } from "./service-routes";

const service = {
  id: 42,
  name: "Full Vehicle Wrap",
  category_id: 6,
  sub_category_id: 9,
};

const category = {
  id: 6,
  name: "SIGNALÉTIQUE",
};

describe("service route helpers", () => {
  it("builds dynamic service detail routes with service and category context", () => {
    expect(
      buildServiceDetailHref({ category, service, from: "catalog" }),
    ).toBe(
      "/services/42?slug=full-vehicle-wrap&serviceId=42&from=catalog&categoryId=6&categorySlug=signaletique&subcategoryId=9",
    );
  });

  it("builds booking flow routes with service id and category id", () => {
    expect(
      buildServiceFlowHref({ category, service, from: "service-detail" }),
    ).toBe(
      "/paint-protection/6?serviceId=42&from=service-detail&categoryId=6&categorySlug=signaletique&subcategoryId=9",
    );
  });
});
