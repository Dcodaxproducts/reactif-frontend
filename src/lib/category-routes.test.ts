import { describe, expect, it } from "vitest";

import {
  buildCategoryRoute,
  buildCategoryRouteFromCategory,
  buildSubcategoryRoute,
  categoryNavigationSlugs,
  findCategoryByNavigationSlug,
  resolveCategorySlug,
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
    expect(resolveCategorySlug("SIGNALÉTIQUE")).toBe("signaletique");
    expect(resolveCategorySlug("Signaletique")).toBe("signaletique");
    expect(resolveCategorySlug("Automotive Advertising")).toBe("automotive");
    expect(resolveCategorySlug("Visual Advertising")).toBe(
      "visual-advertising",
    );
  });

  it("matches footer service categories against API category names", () => {
    expect(findCategoryByNavigationSlug(categories, "automotive")?.id).toBe(8);
    expect(
      findCategoryByNavigationSlug(categories, "visual-advertising")?.id,
    ).toBe(78);
    expect(findCategoryByNavigationSlug(categories, "signaletique")?.id).toBe(
      6,
    );
    expect(findCategoryByNavigationSlug(categories, "apparel")?.id).toBe(74);
    expect(findCategoryByNavigationSlug(categories, "accessories")?.id).toBe(
      77,
    );
  });

  it("keeps the required category navigation set explicit", () => {
    expect(categoryNavigationSlugs).toEqual([
      "automotive",
      "visual-advertising",
      "signaletique",
      "apparel",
      "accessories",
    ]);
  });

  it("builds the same destination for home cards and footer links", () => {
    const category = { id: 6, name: "SIGNALÉTIQUE" };

    expect(buildCategoryRouteFromCategory(category)).toBe(
      buildCategoryRoute({ id: category.id, name: category.name }),
    );
    expect(buildCategoryRouteFromCategory(category)).toBe(
      "/subcategories?id=6&slug=signaletique",
    );
  });

  it("builds dynamic subcategory destinations with category context", () => {
    expect(
      buildSubcategoryRoute({
        category: { id: 6, name: "SIGNALÉTIQUE" },
        subcategory: { id: 79, name: "Test category" },
      }),
    ).toBe(
      "/subcategories?id=6&slug=signaletique&subcategoryId=79&subcategoryName=Test+category",
    );
  });
});
