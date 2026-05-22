"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/errors";
import { getDesigners, type GetDesignersParams } from "@/services/designers";
import type { Designer } from "@/types/designers";

export const designerKeys = {
  all: ["designers"] as const,
  list: (params?: GetDesignersParams) =>
    ["designers", "list", params ?? {}] as const,
};

export const useDesigners = (initialParams: GetDesignersParams = {}) => {
  const [page, setPage] = useState(initialParams.page ?? 1);
  const [designers, setDesigners] = useState<Designer[]>([]);

  const params = { ...initialParams, page };
  const query = useQuery({
    queryKey: designerKeys.list(params),
    queryFn: () => getDesigners(params),
  });

  useEffect(() => {
    const filtered = (query.data?.data ?? []).filter(
      ({ is_verified_user, status }) =>
        is_verified_user === 1 && status === "active",
    );

    if (page === 1) {
      setDesigners(filtered);
      return;
    }

    setDesigners((prev) => [...prev, ...filtered]);
  }, [page, query.data]);

  return {
    ...query,
    designers,
    loading: query.isLoading || query.isFetching,
    error: query.error
      ? getErrorMessage(query.error, "Something went wrong")
      : "",
    page,
    totalPages: query.data?.pagination?.totalPages ?? 1,
    setPage,
  };
};
