"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  getCategories,
  getCategory,
  getServices,
  getServicesBySubcategory,
  type GetCategoriesParams,
  type GetCategoryParams,
  type GetServicesParams,
  type GetServicesBySubcategoryParams,
} from "@/services/categories";
import type { Category } from "@/types/categories";

export const categoryKeys = {
  all: ["categories"] as const,
  list: (params?: GetCategoriesParams) =>
    ["categories", "list", params ?? {}] as const,
  detail: (categoryId?: string | number | null) =>
    ["categories", "detail", categoryId ?? ""] as const,
  services: (subcategoryId?: string | number | null) =>
    ["categories", "services", subcategoryId ?? ""] as const,
  servicesList: (params?: GetServicesParams) =>
    ["categories", "services", "list", params ?? {}] as const,
};

export const useCategories = (initialParams: GetCategoriesParams = {}) => {
  const [page, setPage] = useState(initialParams.page ?? 1);
  const [categories, setCategories] = useState<Category[]>([]);

  const params = { ...initialParams, page };
  const query = useQuery({
    queryKey: categoryKeys.list(params),
    queryFn: () => getCategories(params),
  });

  useEffect(() => {
    const active = (query.data?.data ?? []).filter(
      ({ status }) => status === 1,
    );

    if (page === 1) {
      setCategories(active);
      return;
    }

    setCategories((prev) => [...prev, ...active]);
  }, [page, query.data]);

  const currentPage = query.data?.pagination?.currentPage ?? page;
  const totalPages = query.data?.pagination?.totalPages ?? 1;

  return {
    ...query,
    categories,
    loading: query.isLoading || query.isFetching,
    hasMore: currentPage < totalPages,
    loadMore: async () => setPage((prev) => prev + 1),
  };
};

export const useCategoryDetail = (
  categoryId?: GetCategoryParams["categoryId"] | null,
) => {
  const query = useQuery({
    queryKey: categoryKeys.detail(categoryId),
    queryFn: () => getCategory({ categoryId: categoryId as string | number }),
    enabled: Boolean(categoryId),
  });

  return {
    ...query,
    category: query.data?.data ?? null,
    loading: query.isLoading,
    error: query.error
      ? getErrorMessage(query.error, "Something went wrong.")
      : null,
    refetch: query.refetch,
  };
};

export const useServicesBySubcategory = (
  subcategoryId?: GetServicesBySubcategoryParams["subcategoryId"] | null,
) => {
  const query = useQuery({
    queryKey: categoryKeys.services(subcategoryId),
    queryFn: () =>
      getServicesBySubcategory({
        subcategoryId: subcategoryId as string | number,
      }),
    enabled: Boolean(subcategoryId),
  });

  return {
    ...query,
    services: query.data?.data ?? [],
    loading: query.isLoading,
    error: query.error
      ? getErrorMessage(query.error, "Failed to fetch services")
      : null,
  };
};

export const useServices = (params: GetServicesParams = {}) => {
  const query = useQuery({
    queryKey: categoryKeys.servicesList(params),
    queryFn: () => getServices(params),
  });

  return {
    ...query,
    services: query.data?.data ?? [],
    loading: query.isLoading,
    error: query.error
      ? getErrorMessage(query.error, "Failed to fetch services")
      : null,
  };
};

export const useRefreshCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () =>
      queryClient.invalidateQueries({ queryKey: categoryKeys.all }),
    onSuccess: () => {
      toast.success("Categories refreshed successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to refresh categories"));
    },
  });
};
