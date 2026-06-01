"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  getPaymentGateways,
  getPaymentHistory,
  getWalletList,
  savePayment,
  saveWallet,
} from "@/services/payments";
import type { SavePaymentPayload, SaveWalletPayload } from "@/types/payments";

export const paymentKeys = {
  all: ["payments"] as const,
  gateways: () => ["payments", "gateways"] as const,
  history: () => ["payments", "history"] as const,
  wallet: () => ["payments", "wallet"] as const,
};

export const usePaymentGateways = () => {
  const query = useQuery({
    queryKey: paymentKeys.gateways(),
    queryFn: getPaymentGateways,
  });

  return {
    ...query,
    gateways: query.data ?? [],
    loading: query.isLoading,
    error: query.error ? getErrorMessage(query.error, "Something went wrong") : null,
  };
};

export const useSavePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SavePaymentPayload) => savePayment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.history() });
      toast.success("Payment saved successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to save payment"));
    },
  });
};

export const usePaymentHistory = () => {
  const query = useQuery({
    queryKey: paymentKeys.history(),
    queryFn: getPaymentHistory,
  });

  return {
    ...query,
    payments: query.data?.data ?? [],
    loading: query.isLoading,
    error: query.error ? getErrorMessage(query.error, "Something went wrong") : null,
  };
};

export const useSaveWallet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SaveWalletPayload) => saveWallet(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.wallet() });
      toast.success("Wallet saved successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to save wallet"));
    },
  });
};

export const useWalletList = () => {
  const query = useQuery({
    queryKey: paymentKeys.wallet(),
    queryFn: getWalletList,
  });

  return {
    ...query,
    wallets: query.data?.data ?? [],
    loading: query.isLoading,
    error: query.error ? getErrorMessage(query.error, "Something went wrong") : null,
  };
};

