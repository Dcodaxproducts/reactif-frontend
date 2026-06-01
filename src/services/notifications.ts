import { API_ENDPOINTS } from "@/config/api-endpoints";
import api from "@/lib/axios";
import { normalizeNotifications } from "@/lib/notifications";
import type { AppNotification } from "@/types/notifications";

export const NOTIFICATION_ROUTES = {
  list: API_ENDPOINTS.notificationList,
};

export const getNotifications = async (): Promise<AppNotification[]> => {
  const { data } = await api.get<unknown>(NOTIFICATION_ROUTES.list);

  return normalizeNotifications(data);
};
