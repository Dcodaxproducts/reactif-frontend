import type { Category } from "@/types/categories";

export const categoryNavigationSlugs = [
  "automotive",
  "visual-advertising",
  "signaletique",
  "apparel",
  "accessories",
  "papeterie",
  "habillage-vitrine",
  "enseigne",
] as const;

export type CategoryNavigationSlug = (typeof categoryNavigationSlugs)[number];

export const footerCategoryNavigationItems: Array<{
  slug: CategoryNavigationSlug;
  labelKey: string;
}> = [
  { slug: "automotive", labelKey: "footer.automotive" },
  { slug: "papeterie", labelKey: "footer.papeterie" },
  { slug: "habillage-vitrine", labelKey: "footer.habillageVitrine" },
  { slug: "enseigne", labelKey: "footer.enseigne" },
];

const categoryAliases: Record<CategoryNavigationSlug, string[]> = {
  automotive: [
    "automotive",
    "automotive advertising",
    "automobile",
    "covering/deco/pub",
  ],
  "visual-advertising": [
    "visual-advertising",
    "visual advertising",
    "prestation graphique",
  ],
  signaletique: ["signaletique", "signalétique", "signage"],
  apparel: ["apparel", "vetement", "vêtement", "vetements", "vêtements"],
  accessories: ["accessories", "accessoires", "gadget"],
  papeterie: [
    "papeterie",
    "pappeterie",
    "stationery",
    "printing",
    "print",
    "impression",
  ],
  "habillage-vitrine": [
    "habillage-vitrine",
    "habillage vitrine",
    "vitrine",
    "window",
    "window graphics",
    "vitrophanie",
  ],
  enseigne: ["enseigne", "enseignes", "sign", "signs", "signage"],
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

export const resolveCategorySlug = (value: string): string => {
  const normalizedValue = slugifyCategoryName(value);

  const matchedSlug = categoryNavigationSlugs.find((slug) =>
    categoryAliases[slug]
      .map(slugifyCategoryName)
      .includes(normalizedValue),
  );

  return matchedSlug ?? normalizedValue;
};

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

  const categorySlug =
    slug != null
      ? resolveCategorySlug(slug)
      : name
        ? resolveCategorySlug(name)
        : null;

  if (categorySlug) {
    params.set("slug", categorySlug);
  }

  return `/subcategories?${params.toString()}`;
};

export const buildCategoryRouteFromCategory = (
  category: Pick<Category, "id" | "name">,
) =>
  buildCategoryRoute({ id: category.id, name: category.name });

export const buildSubcategoryRoute = ({
  category,
  subcategory,
}: {
  category: Pick<Category, "id" | "name">;
  subcategory: { id: number | string; name?: string | null };
}) => {
  const params = new URLSearchParams();
  params.set("id", String(category.id));
  params.set("slug", resolveCategorySlug(category.name));
  params.set("subcategoryId", String(subcategory.id));

  if (subcategory.name) {
    params.set("subcategoryName", subcategory.name);
  }

  return `/subcategories?${params.toString()}`;
};

export const buildCategoryRouteFromNavigationSlug = (
  slug: CategoryNavigationSlug,
) => buildCategoryRoute({ slug });

export const findCategoryByNavigationSlug = (
  categories: Category[],
  targetSlug: CategoryNavigationSlug,
) => {
  return categories.find(({ name }) =>
    resolveCategorySlug(name) === targetSlug,
  );
};
