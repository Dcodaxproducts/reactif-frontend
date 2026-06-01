export type AppNotification = {
  id: number | string;
  title: string;
  message: string;
  body: string;
  description: string;
  type: string;
  notification_data: Record<string, unknown> | null;
  is_read: boolean;
  created_at: string;
  image: string | null;
};
