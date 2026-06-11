import { describe, expect, it } from "vitest";

import {
  buildCategoryRoute,
  findCategoryBySlug,
  footerServiceCategorySlugs,
  slugifyCategoryName,
} from "./category-routes";
import type { Category } from "@/types/categories";

const categories: Category[] = [
  { id: 8, name: "COVERING/DECO/PUB", status: 1 },
  { id: 78, name: "PRESTATION GRAPHIQUE", status: 1 },
  { id: 6, name: "SIGNALÉTIQUE", status: 1 },
  { id: 74, name: "VÊTEMENT", status: 1 },
  { id: 77, name: "GADGET", status: 1 },
];

describe("category route helpers", () => {
  it("builds the shared subcategory route used by home and footer links", () => {
    expect(buildCategoryRoute({ id: 10, name: "Automotive" })).toBe(
      "/subcategories?id=10&slug=automotive",
    );
  });

  it("normalizes category names and diacritics", () => {
    expect(slugifyCategoryName("Signalétique")).toBe("signaletique");
  });

  it("matches footer service categories against API category names", () => {
    expect(findCategoryBySlug(categories, "automotive")?.id).toBe(8);
    expect(findCategoryBySlug(categories, "visual-advertising")?.id).toBe(78);
    expect(findCategoryBySlug(categories, "signaletique")?.id).toBe(6);
    expect(findCategoryBySlug(categories, "apparel")?.id).toBe(74);
    expect(findCategoryBySlug(categories, "accessories")?.id).toBe(77);
  });

  it("keeps the required footer service category set explicit", () => {
    expect(footerServiceCategorySlugs).toEqual([
      "automotive",
      "visual-advertising",
      "signaletique",
      "apparel",
      "accessories",
    ]);
  });
});
