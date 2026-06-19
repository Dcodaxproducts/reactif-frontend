import type { Category, Service } from "@/types/categories";

const normalizeSearchText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const filterCatalogServices = ({
  services,
  categories,
  search,
}: {
  services: Service[];
  categories: Category[];
  search: string;
}) => {
  const query = normalizeSearchText(search);

  if (!query) {
    return services;
  }

  const categoryNamesById = new Map(
    categories.map((category) => [category.id, category.name]),
  );
  const subcategoryNamesById = new Map(
    categories.flatMap((category) =>
      (category.subcategories ?? []).map((subcategory) => [
        subcategory.id,
        subcategory.name,
      ]),
    ),
  );

  return services.filter((service) => {
    const searchableText = normalizeSearchText(
      [
        service.name,
        service.description,
        categoryNamesById.get(service.category_id),
        subcategoryNamesById.get(service.sub_category_id),
        String(service.price),
      ]
        .filter(Boolean)
        .join(" "),
    );

    return searchableText.includes(query);
  });
};

export const filterCatalogCategories = ({
  categories,
  search,
}: {
  categories: Category[];
  search: string;
}) => {
  const query = normalizeSearchText(search);

  if (!query) {
    return categories;
  }

  return categories.filter((category) => {
    const subcategoryText = (category.subcategories ?? [])
      .map((subcategory) => `${subcategory.name} ${subcategory.description}`)
      .join(" ");
    const searchableText = normalizeSearchText(
      [category.name, category.description, subcategoryText]
        .filter(Boolean)
        .join(" "),
    );

    return searchableText.includes(query);
  });
};
