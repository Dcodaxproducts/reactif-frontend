export type PaymentGateway = {
  id: number | string;
  title: string;
  name: string;
  type: string;
  status: string | number | boolean;
  isTest?: boolean;
  is_test?: string | number | boolean | null;
  url?: string | null;
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

export type PaymentHistoryItem = {
  id: number | string;
  booking_id: number | string;
  amount?: number | string | null;
  datetime?: string | null;
  total_amount?: number | string | null;
  txn_id?: string | null;
  transaction_id?: string | null;
  payment_type?: string | null;
  payment_status?: string | null;
  user_id?: number | string | null;
  user_name?: string | null;
  created_at?: string | null;
};

export type SaveWalletPayload = {
  amount: number | string;
  type: "credit" | "debit";
  gateway_id?: number | string;
  payment_method?: string;
  token?: string;
  title?: string;
};

export type WalletItem = {
  id: number | string;
  gateway_id?: number | string | null;
  amount?: number | string | null;
  balance?: number | string | null;
  type?: string | null;
  title?: string | null;
  payment_method?: string | null;
  status?: string | number | boolean | null;
  created_at?: string | null;
};
