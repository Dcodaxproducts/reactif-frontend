import type { AppNotification } from "@/types/notifications";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const readString = (value: unknown) =>
  typeof value === "string" || typeof value === "number" ? String(value) : "";

const readBoolean = (value: unknown) =>
  value === true || value === 1 || value === "1" || value === "true";

const readNotificationData = (value: unknown) =>
  isRecord(value) ? value : null;

export const normalizeNotification = (value: unknown): AppNotification => {
  const record = isRecord(value) ? value : {};
  const message =
    readString(record.message) ||
    readString(record.body) ||
    readString(record.description);

  return {
    id: readString(record.id),
    title: readString(record.title) || "Notification",
    message,
    body: readString(record.body) || message,
    description: readString(record.description) || message,
    type: readString(record.type) || "general",
    notification_data: readNotificationData(record.notification_data),
    is_read: readBoolean(record.is_read),
    created_at: readString(record.created_at),
    image: readString(record.image) || null,
  };
};

export const normalizeNotifications = (value: unknown) => {
  const record = isRecord(value) ? value : {};
  const candidates = Array.isArray(value)
    ? value
    : Array.isArray(record.data)
      ? record.data
      : Array.isArray(record.notifications)
        ? record.notifications
        : [];

  return candidates.map(normalizeNotification);
};
