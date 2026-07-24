import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/api-endpoints";
import {
  filterServicesByParams,
  normalizeServiceDetailResponse,
  normalizeServicesResponse,
} from "@/lib/service-response";
import type { ApiItemResponse, ApiListResponse } from "@/types/api";
import type { Category, Service } from "@/types/categories";

/**
 * ==============================
 * TYPES
 * ==============================
 */

export type GetCategoriesParams = {
  page?: number;
  per_page?: number;
};

export type GetCategoryParams = {
  categoryId: string | number;
};

export type GetServicesBySubcategoryParams = {
  subcategoryId: string | number;
};

export type GetServicesParams = {
  page?: number;
  per_page?: number;
  limit?: number;
  offset?: number;
  category_id?: string | number;
  sub_category_id?: string | number;
  service_id?: string | number;
  search?: string;
};

/**
 * ==============================
 * ROUTES
 * ==============================
 */

export const CATEGORY_ROUTES = {
  list: API_ENDPOINTS.category,
  detail: (categoryId: string | number) =>
    `${API_ENDPOINTS.category}/${encodeURIComponent(String(categoryId))}`,
  services: API_ENDPOINTS.service,
  serviceDetail: (serviceId: string | number) =>
    `${API_ENDPOINTS.service}/${encodeURIComponent(String(serviceId))}`,
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
  return getServices({ sub_category_id: subcategoryId });
};

export const getServices = async (
  params: GetServicesParams = {},
): Promise<ApiListResponse<Service>> => {
  const { data } = await api.get<unknown>(CATEGORY_ROUTES.services, {
    params: cleanParams(params),
  });

  const response = normalizeServicesResponse(data);

  return {
    ...response,
    data: filterServicesByParams(response.data, params),
  };
};

export const getServiceDetail = async (
  serviceId: string | number,
): Promise<Service | null> => {
  const { data } = await api.get<unknown>(
    CATEGORY_ROUTES.serviceDetail(serviceId),
  );

  return normalizeServiceDetailResponse(data);
};

export const searchServices = async (
  search: string,
): Promise<ApiListResponse<Service>> => getServices({ search });
