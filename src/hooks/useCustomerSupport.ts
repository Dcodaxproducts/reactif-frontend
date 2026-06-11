"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getErrorMessage } from "@/lib/errors";
import {
  getCustomerSupportRequests,
  saveCustomerSupportRequest,
} from "@/services/support";
import type {
  CustomerSupportPayload,
  CustomerSupportResponse,
} from "@/services/support";

export const customerSupportKeys = {
  all: ["customer-support"] as const,
  list: () => ["customer-support", "list"] as const,
};

export const useCustomerSupportRequests = () => {
  const query = useQuery({
    queryKey: customerSupportKeys.list(),
    queryFn: getCustomerSupportRequests,
    retry: false,
  });

  return {
    ...query,
    requests: query.data ?? [],
    loading: query.isLoading,
    rawError: query.error,
    error: query.error
      ? getErrorMessage(query.error, "Failed to load support requests")
      : null,
  };
};

export const useSaveCustomerSupportRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<CustomerSupportResponse, Error, CustomerSupportPayload>({
    mutationFn: saveCustomerSupportRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerSupportKeys.all });
    },
  });
};
