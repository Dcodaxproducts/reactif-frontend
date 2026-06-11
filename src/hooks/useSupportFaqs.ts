"use client";

import { useQuery } from "@tanstack/react-query";

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

  return {
    ...query,
    faqs: query.data ?? [],
    loading: query.isLoading,
  };
};
