import type { PaymentGateway } from "@/types/payments";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const readString = (value: unknown) =>
  typeof value === "string" || typeof value === "number" ? String(value) : "";

const readBoolean = (value: unknown) =>
  value === true || value === 1 || value === "1" || value === "true";

const getGatewayConfig = (record: Record<string, unknown>) => {
  const testValue = isRecord(record.test_value) ? record.test_value : null;
  const liveValue = isRecord(record.live_value) ? record.live_value : null;

  if (readBoolean(record.is_test)) {
    return testValue ?? liveValue ?? {};
  }

  return liveValue ?? testValue ?? {};
};

export const normalizePaymentGateway = (value: unknown): PaymentGateway => {
  const record = isRecord(value) ? value : {};
  const gatewayConfig = getGatewayConfig(record);
  const id = readString(record.id) || readString(record.gateway_id);
  const title = readString(record.title) || readString(record.name) || "Payment";
  const publishableKey =
    readString(record.publishableKey) ||
    readString(record.publishable_key) ||
    readString(gatewayConfig.publishable_key) ||
    readString(gatewayConfig.publishableKey) ||
    null;
  const url = readString(record.url) || readString(gatewayConfig.url) || null;

  return {
    id,
    title,
    name: readString(record.name) || title,
    type: readString(record.type) || readString(record.payment_type),
    status: readString(record.status) || "active",
    isTest: readBoolean(record.is_test),
    is_test: readString(record.is_test) || null,
    url,
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
