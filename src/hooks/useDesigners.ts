"use client";

import { useCallback, useEffect, useState } from "react";
import { designerService } from "@/services/designers";
import type { Designer } from "@/types/designers";

export const useDesigners = (initialPage = 1) => {
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDesigners = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    setError("");
    try {
      const json = await designerService.list(pageNumber);
      const newDesigners = (json?.data || []).filter(
        (designer) => designer.is_verified_user === 1 && designer.status === "active",
      );
      setDesigners((prev) => (pageNumber === 1 ? newDesigners : [...prev, ...newDesigners]));
      setTotalPages(json?.pagination?.totalPages || 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDesigners(page);
  }, [fetchDesigners, page]);

  return { designers, loading, error, page, totalPages, setPage };
};
