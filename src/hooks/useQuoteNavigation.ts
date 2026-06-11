"use client";

import { useRouter } from "next/navigation";

import { buildLoginRoute, useAuth } from "@/hooks/useAuth";
import { QUOTE_REQUEST_ROUTE } from "@/lib/quote-routes";

export function useQuoteNavigation() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const openQuoteFlow = () => {
    router.push(user ? QUOTE_REQUEST_ROUTE : buildLoginRoute(QUOTE_REQUEST_ROUTE));
  };

  return {
    loading,
    openQuoteFlow,
  };
}
