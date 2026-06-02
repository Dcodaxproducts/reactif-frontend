export type MessageInboxItem = {
  booking_id: number | string;
  receiver_id: number | string;
  last_message: string;
  last_message_id: number | string;
  unread_message_count: number;
  receiver_name: string;
  receiver_image?: string | null;
  sender_name: string;
  is_read: boolean;
};

export type ChatMessage = {
  id: number | string;
  booking_id: number | string;
  receiver_id: number | string;
  sender_id: number | string;
  message: string;
  sender_type: string;
  receiver_type: string;
  is_read: boolean;
  isImage: boolean;
  file_url?: string | null;
  image_url?: string | null;
  created_at: string;
};

export type GetMessagesParams = {
  booking_id: number | string;
};

export type SendMessagePayload = {
  booking_id: number | string;
  receiver_id: number | string;
  message: string;
  images?: File[];
};
