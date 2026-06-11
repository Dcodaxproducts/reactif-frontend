import type { CustomerSupportRequest } from "@/types/support";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const readString = (value: unknown) =>
  typeof value === "string" || typeof value === "number" ? String(value) : "";

const readFirstString = (
  record: Record<string, unknown>,
  keys: readonly string[],
) => {
  for (const key of keys) {
    const value = readString(record[key]).trim();
    if (value) return value;
  }

  return "";
};

const getSupportItems = (response: unknown): unknown[] => {
  if (Array.isArray(response)) {
    return response;
  }

  if (!isRecord(response)) {
    return [];
  }

  const candidates = [
    response.data,
    response.customer_support,
    response.customerSupport,
    response.customersupport,
    response.support_requests,
    response.requests,
    response.tickets,
  ];

  return candidates.find(Array.isArray) ?? [];
};

export const normalizeCustomerSupportRequests = (
  response: unknown,
): CustomerSupportRequest[] =>
  getSupportItems(response).flatMap((item, index) => {
    if (!isRecord(item)) {
      return [];
    }

    const id =
      readFirstString(item, ["id", "support_id", "ticket_id", "uuid"]) ||
      String(index + 1);
    const message = readFirstString(item, [
      "message",
      "description",
      "body",
      "content",
    ]);

    return [
      {
        id,
        name: readFirstString(item, [
          "name",
          "full_name",
          "customer_name",
          "user_name",
        ]),
        email: readFirstString(item, ["email", "customer_email"]),
        phone: readFirstString(item, [
          "phone",
          "contact_number",
          "customer_phone",
        ]),
        service: readFirstString(item, [
          "service",
          "category",
          "service_interest",
          "service_category",
        ]),
        subject: readFirstString(item, ["subject", "title"]) || message,
        message,
        status: readFirstString(item, ["status", "ticket_status"]) || "open",
        source: readFirstString(item, ["source", "type"]),
        created_at: readFirstString(item, [
          "created_at",
          "createdAt",
          "date",
          "submitted_at",
        ]),
      },
    ];
  });
