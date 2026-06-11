import type { Category } from "@/types/categories";

export const footerServiceCategorySlugs = [
  "automotive",
  "visual-advertising",
  "signaletique",
  "apparel",
  "accessories",
] as const;

export type FooterServiceCategorySlug =
  (typeof footerServiceCategorySlugs)[number];

const categoryAliases: Record<FooterServiceCategorySlug, string[]> = {
  automotive: ["automotive", "automobile"],
  "visual-advertising": ["visual-advertising", "visual-advertising"],
  signaletique: ["signaletique", "signalétique", "signage"],
  apparel: ["apparel", "vetements", "vêtements"],
  accessories: ["accessories", "accessoires"],
};

export const slugifyCategoryName = (value: string) =>
  value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const buildCategoryRoute = ({
  id,
  name,
  slug,
}: {
  id?: number | string | null;
  name?: string | null;
  slug?: string | null;
}) => {
  const params = new URLSearchParams();

  if (id != null) {
    params.set("id", String(id));
  }

  const categorySlug = slug ?? (name ? slugifyCategoryName(name) : null);

  if (categorySlug) {
    params.set("slug", categorySlug);
  }

  return `/subcategories?${params.toString()}`;
};

export const findCategoryBySlug = (
  categories: Category[],
  targetSlug: FooterServiceCategorySlug,
) => {
  const acceptedSlugs = new Set(
    categoryAliases[targetSlug].map(slugifyCategoryName),
  );

  return categories.find(({ name }) =>
    acceptedSlugs.has(slugifyCategoryName(name)),
  );
};
