"use client";

import { useCallback, useEffect, useState } from "react";
import { categoryService } from "@/services/categories";
import type { Category, Service } from "@/types/categories";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchCategories = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    try {
      const data = await categoryService.list(pageNumber);
      const active = (data.data || []).filter((item) => item.status === 1);
      setCategories((prev) => (pageNumber === 1 ? active : [...prev, ...active]));
      setHasMore(Boolean(data.pagination && data.pagination.currentPage < data.pagination.totalPages));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories(1);
  }, [fetchCategories]);

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchCategories(nextPage);
  };

  return { categories, loading, hasMore, loadMore };
};

export const useCategoryDetail = (categoryId?: string | number | null) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!categoryId) {
      setError("No category selected.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await categoryService.detail(categoryId);
      if (!data?.data) throw new Error("Category not found.");
      setCategory(data.data);
    } catch (err) {
      setCategory(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { category, loading, error, refetch };
};

export const useServicesBySubcategory = (subcategoryId?: string | number | null) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      if (!subcategoryId) {
        setServices([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await categoryService.servicesBySubcategory(subcategoryId);
        setServices(data?.data || []);
      } catch (err) {
        setServices([]);
        setError(err instanceof Error ? err.message : "Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [subcategoryId]);

  return { services, loading, error };
};
