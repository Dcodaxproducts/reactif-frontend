import { API_ENDPOINTS } from "@/config/api-endpoints";
import api from "@/lib/axios";
import {
  normalizeChatMessage,
  normalizeInboxItem,
  normalizeListResponse,
} from "@/lib/messages";
import type {
  ChatMessage,
  GetMessagesParams,
  MessageInboxItem,
  SendMessagePayload,
} from "@/types/messages";

export const MESSAGE_ROUTES = {
  inbox: API_ENDPOINTS.messageInbox,
  get: API_ENDPOINTS.messageGet,
  send: API_ENDPOINTS.messageSend,
};

const createMessageFormData = (payload: SendMessagePayload) => {
  const body = new FormData();
  body.append("booking_id", String(payload.booking_id));
  body.append("receiver_id", String(payload.receiver_id));
  body.append("message", payload.message);
  payload.images?.forEach((image, index) => {
    body.append(`images[${index}]`, image);
  });

  return body;
};

export const getMessageInbox = async (): Promise<MessageInboxItem[]> => {
  const { data } = await api.get<unknown>(MESSAGE_ROUTES.inbox);

  return normalizeListResponse(data, normalizeInboxItem);
};

export const getMessages = async (
  params: GetMessagesParams,
): Promise<ChatMessage[]> => {
  const { data } = await api.get<unknown>(MESSAGE_ROUTES.get, { params });

  return normalizeListResponse(data, normalizeChatMessage);
};

export const sendMessage = async (payload: SendMessagePayload) => {
  const { data } = await api.post(MESSAGE_ROUTES.send, createMessageFormData(payload), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
