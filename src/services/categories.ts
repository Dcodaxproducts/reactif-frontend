import { apiClient } from "@/services/api-client";
import type { ApiItemResponse, ApiListResponse, Category, Service } from "@/types/categories";

export const categoryService = {
  list(page = 1) {
    return apiClient<ApiListResponse<Category>>(`/categories?page=${page}`);
  },

  detail(categoryId: string | number) {
    return apiClient<ApiItemResponse<Category>>(`/categories/${categoryId}`);
  },

  servicesBySubcategory(subcategoryId: string | number) {
    return apiClient<ApiListResponse<Service>>(`/services?sub_category_id=${subcategoryId}`);
  },
};
