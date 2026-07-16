"use client";

import { useQuery } from "@tanstack/react-query";

import { fallbackSupportFaqs } from "@/data/home";
import { getSupportFaqs } from "@/services/support";

export const supportFaqKeys = {
  all: ["support-faqs"] as const,
  list: () => ["support-faqs", "list"] as const,
};

export const useSupportFaqs = () => {
  const query = useQuery({
    queryKey: supportFaqKeys.list(),
    queryFn: getSupportFaqs,
    retry: false,
  });
  const hasBackendError = query.isError;

  return {
    ...query,
    faqs: hasBackendError ? fallbackSupportFaqs : query.data ?? [],
    loading: query.isLoading,
    isFallback: hasBackendError,
  };
};
