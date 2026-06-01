"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  getMessageInbox,
  getMessages,
  sendMessage,
} from "@/services/messages";
import type { GetMessagesParams, SendMessagePayload } from "@/types/messages";

export const messageKeys = {
  all: ["messages"] as const,
  inbox: () => ["messages", "inbox"] as const,
  chat: (bookingId: number | string | null | undefined) =>
    ["messages", "chat", bookingId] as const,
};

export const useMessageInbox = () => {
  const query = useQuery({
    queryKey: messageKeys.inbox(),
    queryFn: getMessageInbox,
  });

  return {
    ...query,
    inbox: query.data ?? [],
    loading: query.isLoading,
    error: query.error ? getErrorMessage(query.error, "Something went wrong") : null,
  };
};

export const useMessages = (params?: GetMessagesParams | null) => {
  const query = useQuery({
    queryKey: messageKeys.chat(params?.booking_id),
    queryFn: () => getMessages({ booking_id: params?.booking_id ?? "" }),
    enabled: Boolean(params?.booking_id),
  });

  return {
    ...query,
    messages: query.data ?? [],
    loading: query.isLoading,
    error: query.error ? getErrorMessage(query.error, "Something went wrong") : null,
  };
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SendMessagePayload) => sendMessage(payload),
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: messageKeys.chat(payload.booking_id),
      });
      queryClient.invalidateQueries({ queryKey: messageKeys.inbox() });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to send message"));
    },
  });
};

