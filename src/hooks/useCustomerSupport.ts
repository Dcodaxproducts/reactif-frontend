"use client";

import { useMutation } from "@tanstack/react-query";

import { saveCustomerSupportRequest } from "@/services/support";
import type {
  CustomerSupportPayload,
  CustomerSupportResponse,
} from "@/services/support";

export const useSaveCustomerSupportRequest = () =>
  useMutation<CustomerSupportResponse, Error, CustomerSupportPayload>({
    mutationFn: saveCustomerSupportRequest,
  });
