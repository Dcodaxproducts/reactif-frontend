import { apiClient } from "@/services/api-client";
import type { ApiListResponse } from "@/types/categories";
import type { Designer } from "@/types/designers";

export const designerService = {
  list(page = 1) {
    return apiClient<ApiListResponse<Designer>>(`/designer-list?page=${page}`);
  },
};
