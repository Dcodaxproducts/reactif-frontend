import { API_ENDPOINTS } from "@/config/api-endpoints";
import api from "@/lib/axios";
import { getPaymentSaveError } from "@/lib/payment-save-response";
import { normalizePaymentGatewayList } from "@/lib/payments";
import type { ApiListResponse } from "@/types/api";
import type {
  PaymentGateway,
  PaymentHistoryItem,
  SavePaymentPayload,
  SaveWalletPayload,
  WalletItem,
} from "@/types/payments";

export const PAYMENT_ROUTES = {
  gateways: API_ENDPOINTS.paymentGatewayList,
  savePayment: API_ENDPOINTS.savePayment,
  history: API_ENDPOINTS.paymentHistory,
  saveWallet: API_ENDPOINTS.saveWallet,
  walletList: API_ENDPOINTS.walletList,
};

export const getPaymentGateways = async (): Promise<PaymentGateway[]> => {
  const { data } = await api.get<unknown>(PAYMENT_ROUTES.gateways);

  return normalizePaymentGatewayList(data);
};

export const savePayment = async (payload: SavePaymentPayload) => {
  const { data } = await api.post(PAYMENT_ROUTES.savePayment, payload);
  const paymentError = getPaymentSaveError(data);

  if (paymentError) {
    throw new Error(paymentError);
  }

  return data;
};

export const getPaymentHistory = async (): Promise<
  ApiListResponse<PaymentHistoryItem>
> => {
  const { data } = await api.get<ApiListResponse<PaymentHistoryItem>>(
    PAYMENT_ROUTES.history,
  );

  return data;
};

export const saveWallet = async (payload: SaveWalletPayload) => {
  const { data } = await api.post(PAYMENT_ROUTES.saveWallet, payload);
  const walletError = getPaymentSaveError(data);

  if (walletError) {
    throw new Error(walletError);
  }

  return data;
};

export const getWalletList = async (): Promise<ApiListResponse<WalletItem>> => {
  const { data } = await api.get<ApiListResponse<WalletItem>>(
    PAYMENT_ROUTES.walletList,
  );

  return data;
};
