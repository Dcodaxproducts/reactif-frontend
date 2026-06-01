"use client";

import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "@/lib/errors";
import { getNotifications } from "@/services/notifications";

export const notificationKeys = {
  all: ["notifications"] as const,
  list: () => ["notifications", "list"] as const,
};

export const useNotifications = () => {
  const query = useQuery({
    queryKey: notificationKeys.list(),
    queryFn: getNotifications,
  });

  return {
    ...query,
    notifications: query.data ?? [],
    loading: query.isLoading,
    error: query.error
      ? getErrorMessage(query.error, "Something went wrong")
      : null,
  };
};
