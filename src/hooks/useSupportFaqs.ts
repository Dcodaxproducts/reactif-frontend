"use client";

import { useQuery } from "@tanstack/react-query";

import { featuredFAQs } from "@/data/help-center";
import { getSupportFaqs } from "@/services/support";
import type { SupportFaq } from "@/types/support";

export const supportFaqKeys = {
  all: ["support-faqs"] as const,
  list: () => ["support-faqs", "list"] as const,
};

const staticFaqs: SupportFaq[] = featuredFAQs.map((faq) => ({
  id: faq.value,
  ...faq,
}));

export const useSupportFaqs = () => {
  const query = useQuery({
    queryKey: supportFaqKeys.list(),
    queryFn: getSupportFaqs,
    retry: false,
  });

  const apiFaqs = query.data ?? [];
  const faqs = apiFaqs.length > 0 ? apiFaqs : staticFaqs;

  return {
    ...query,
    faqs,
    loading: query.isLoading,
  };
};
