import type { PaymentGateway } from "@/types/payments";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const readString = (value: unknown) =>
  typeof value === "string" || typeof value === "number" ? String(value) : "";

export const normalizePaymentGateway = (value: unknown): PaymentGateway => {
  const record = isRecord(value) ? value : {};
  const id = readString(record.id) || readString(record.gateway_id);
  const title = readString(record.title) || readString(record.name) || "Payment";
  const publishableKey =
    readString(record.publishableKey) || readString(record.publishable_key) || null;

  return {
    id,
    title,
    name: readString(record.name) || title,
    type: readString(record.type) || readString(record.payment_type),
    status: readString(record.status) || "active",
    gateway_image: readString(record.gateway_image) || null,
    publishableKey,
    publishable_key: publishableKey,
  };
};

export const normalizePaymentGatewayList = (value: unknown) => {
  const record = isRecord(value) ? value : {};
  const candidates = Array.isArray(value)
    ? value
    : Array.isArray(record.data)
      ? record.data
      : Array.isArray(record.gateways)
        ? record.gateways
        : [];

  return candidates.map(normalizePaymentGateway);
};

