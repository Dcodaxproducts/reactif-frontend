import type { ChatMessage, MessageInboxItem } from "@/types/messages";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const readString = (value: unknown) =>
  typeof value === "string" || typeof value === "number" ? String(value) : "";

const readBoolean = (value: unknown) =>
  value === true || value === 1 || value === "1" || value === "true";

const readNumber = (value: unknown) => {
  const nextValue = Number(value);
  return Number.isFinite(nextValue) ? nextValue : 0;
};

export const normalizeInboxItem = (value: unknown): MessageInboxItem => {
  const record = isRecord(value) ? value : {};

  return {
    booking_id: readString(record.booking_id),
    receiver_id: readString(record.receiver_id),
    last_message: readString(record.last_message),
    last_message_id: readString(record.last_message_id),
    unread_message_count: readNumber(record.unread_message_count),
    receiver_name: readString(record.receiver_name),
    receiver_image: readString(record.receiver_image) || null,
    sender_name: readString(record.sender_name),
    is_read: readBoolean(record.is_read),
  };
};

export const normalizeChatMessage = (value: unknown): ChatMessage => {
  const record = isRecord(value) ? value : {};
  const imageUrl =
    readString(record.image_url) ||
    readString(record.image) ||
    readString(record.file_url);

  return {
    id: readString(record.id),
    booking_id: readString(record.booking_id),
    receiver_id: readString(record.receiver_id),
    sender_id: readString(record.sender_id),
    message: readString(record.message),
    sender_type: readString(record.sender_type),
    receiver_type: readString(record.receiver_type),
    is_read: readBoolean(record.is_read),
    isImage: readBoolean(record.isImage) || imageUrl !== "",
    image_url: imageUrl || null,
    file_url: readString(record.file_url) || imageUrl || null,
    created_at: readString(record.created_at),
  };
};

export const normalizeListResponse = <T>(
  value: unknown,
  normalizer: (item: unknown) => T,
) => {
  const record = isRecord(value) ? value : {};
  const candidates = Array.isArray(value)
    ? value
    : Array.isArray(record.data)
      ? record.data
      : Array.isArray(record.messages)
        ? record.messages
        : Array.isArray(record.inbox)
          ? record.inbox
          : [];

  return candidates.map(normalizer);
};
