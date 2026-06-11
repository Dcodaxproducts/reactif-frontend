import { describe, expect, it } from "vitest";

import {
  buildCategoryRoute,
  findCategoryBySlug,
  footerServiceCategorySlugs,
  slugifyCategoryName,
} from "./category-routes";
import type { Category } from "@/types/categories";

const categories: Category[] = [
  { id: 10, name: "Automotive", status: 1 },
  { id: 20, name: "Visual Advertising", status: 1 },
  { id: 30, name: "Signalétique", status: 1 },
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
    expect(findCategoryBySlug(categories, "visual-advertising")?.id).toBe(20);
    expect(findCategoryBySlug(categories, "signaletique")?.id).toBe(30);
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
