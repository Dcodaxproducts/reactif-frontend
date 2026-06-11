import { resolveCategorySlug } from "@/lib/category-routes";
import type { Category, Service } from "@/types/categories";

export const buildServiceFlowHref = ({
  category,
  service,
  from,
}: {
  category: Pick<Category, "id" | "name">;
  service: Pick<Service, "id" | "sub_category_id">;
  from: string;
}) => {
  const params = new URLSearchParams({
    serviceId: String(service.id),
    categoryId: String(category.id),
    categorySlug: resolveCategorySlug(category.name),
    from,
  });

  if (service.sub_category_id) {
    params.set("subcategoryId", String(service.sub_category_id));
  }

  return `/paint-protection/${category.id}?${params.toString()}`;
};
