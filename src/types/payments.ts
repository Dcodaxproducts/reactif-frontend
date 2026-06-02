export type PaymentGateway = {
  id: number | string;
  title: string;
  name: string;
  type: string;
  status: string | number | boolean;
  gateway_image?: string | null;
  publishableKey?: string | null;
  publishable_key?: string | null;
};

export type SavePaymentPayload = {
  user_id: number | string;
  booking_id: number | string;
  amount: number | string;
  transaction_id: string;
  payment_type: string;
  payment_method: string;
  payment_status: string;
};

export type PaymentHistoryItem = SavePaymentPayload & {
  id: number | string;
  created_at?: string | null;
};

export type SaveWalletPayload = {
  gateway_id?: number | string;
  payment_method: string;
  token?: string;
  title?: string;
};

export type WalletItem = {
  id: number | string;
  gateway_id?: number | string | null;
  title: string;
  payment_method: string;
  status?: string | number | boolean | null;
  created_at?: string | null;
};
