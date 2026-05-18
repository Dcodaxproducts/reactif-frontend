import api from "@/lib/axios";
import type { ApiItemResponse, ApiListResponse } from "@/types/api";
import type { Category, Service } from "@/types/categories";

/**
 * ==============================
 * TYPES
 * ==============================
 */

export type GetCategoriesParams = {
  page?: number;
};

export type GetCategoryParams = {
  categoryId: string | number;
};

export type GetServicesBySubcategoryParams = {
  subcategoryId: string | number;
};

/**
 * ==============================
 * ROUTES
 * ==============================
 */

export const CATEGORY_ROUTES = {
  list: "/categories",
  detail: (categoryId: string | number) =>
    `/categories/${encodeURIComponent(String(categoryId))}`,
  services: "/services",
};

/**
 * ==============================
 * HELPERS
 * ==============================
 */

const cleanParams = <T extends Record<string, unknown>>(params?: T) => {
  if (!params) return undefined;

  const cleaned = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );

  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
};

/**
 * ==============================
 * CATEGORY APIS
 * ==============================
 */

export const getCategories = async (
  params: GetCategoriesParams = {},
): Promise<ApiListResponse<Category>> => {
  const { data } = await api.get<ApiListResponse<Category>>(
    CATEGORY_ROUTES.list,
    {
      params: cleanParams(params),
    },
  );

  return data;
};

export const getCategory = async ({
  categoryId,
}: GetCategoryParams): Promise<ApiItemResponse<Category>> => {
  const { data } = await api.get<ApiItemResponse<Category>>(
    CATEGORY_ROUTES.detail(categoryId),
  );

  return data;
};

export const getServicesBySubcategory = async ({
  subcategoryId,
}: GetServicesBySubcategoryParams): Promise<ApiListResponse<Service>> => {
  const { data } = await api.get<ApiListResponse<Service>>(
    CATEGORY_ROUTES.services,
    {
      params: cleanParams({ sub_category_id: subcategoryId }),
    },
  );

  return data;
};
