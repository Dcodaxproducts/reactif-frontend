import { resolveCategorySlug } from "./category-routes";
import type { Category, Service } from "@/types/categories";

type ServiceRouteCategory = Pick<Category, "id" | "name">;
type ServiceRouteService = Pick<
  Service,
  "id" | "name" | "category_id" | "sub_category_id"
>;

const slugifyServiceName = (value: string) =>
  value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getCategoryId = ({
  category,
  service,
}: {
  category?: ServiceRouteCategory | null;
  service: ServiceRouteService;
}) => category?.id ?? service.category_id;

const appendServiceContextParams = ({
  params,
  category,
  service,
  from,
}: {
  params: URLSearchParams;
  category?: ServiceRouteCategory | null;
  service: ServiceRouteService;
  from: string;
}) => {
  const categoryId = getCategoryId({ category, service });

  params.set("serviceId", String(service.id));
  params.set("from", from);

  if (categoryId) {
    params.set("categoryId", String(categoryId));
  }

  if (category?.name) {
    params.set("categorySlug", resolveCategorySlug(category.name));
  }

  if (service.sub_category_id) {
    params.set("subcategoryId", String(service.sub_category_id));
  }
};

export const buildServiceFlowHref = ({
  category,
  service,
  from,
}: {
  category?: ServiceRouteCategory | null;
  service: ServiceRouteService;
  from: string;
}) => {
  const params = new URLSearchParams();
  const categoryId = getCategoryId({ category, service });

  appendServiceContextParams({ params, category, service, from });

  return `/paint-protection/${categoryId || "service"}?${params.toString()}`;
};

export const buildServiceDetailHref = ({
  category,
  service,
  from,
}: {
  category?: ServiceRouteCategory | null;
  service: ServiceRouteService;
  from: string;
}) => {
  const params = new URLSearchParams({
    slug: slugifyServiceName(service.name),
  });

  appendServiceContextParams({ params, category, service, from });

  return `/services/${service.id}?${params.toString()}`;
};
