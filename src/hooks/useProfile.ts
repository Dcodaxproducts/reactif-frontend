"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  deleteUserAccount,
  getUserProfile,
  updateUserProfile,
} from "@/services/profile";
import type {
  BackendUserProfile,
  ProfileFormPayload,
  UserProfile,
} from "@/types/profile";

/**
 * ==============================
 * QUERY KEYS
 * ==============================
 */

export const profileKeys = {
  all: ["profile"] as const,
  detail: () => ["profile", "detail"] as const,
};

/**
 * ==============================
 * HELPERS
 * ==============================
 */

const mapProfile = (
  backendUser: BackendUserProfile,
  isVerified = false,
): UserProfile => ({
  id: backendUser.id,
  name: backendUser.name,
  email: backendUser.email,
  phone: backendUser.contact_number || "",
  avatar: backendUser.profile_image || null,
  address: backendUser.address || "",
  bio: backendUser.bio || "",
  created_at: backendUser.created_at,
  updated_at: backendUser.updated_at,
  is_verified: isVerified,
});

/**
 * ==============================
 * PROFILE HOOKS
 * ==============================
 */

export const useProfile = () => {
  const query = useQuery({
    queryKey: profileKeys.detail(),
    queryFn: getUserProfile,
  });

  const storedUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("current_user") || "{}")
      : {};
  const mappedProfile = query.data?.data
    ? mapProfile(query.data.data, storedUser.isVerified ?? false)
    : null;

  return {
    ...query,
    user: mappedProfile,
    loading: query.isLoading,
    error: query.error
      ? getErrorMessage(query.error, "Something went wrong.")
      : null,
    refetch: query.refetch,
  };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ProfileFormPayload) => updateUserProfile(payload),
    onSuccess: (result) => {
      const storedUser = JSON.parse(
        localStorage.getItem("current_user") || "{}",
      );
      localStorage.setItem(
        "current_user",
        JSON.stringify({ ...storedUser, ...result.data }),
      );
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
      toast.success("Profile updated successfully.");
      router.push("/profile");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Something went wrong."));
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteUserAccount,
    onSuccess: () => {
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("current_user");
      queryClient.clear();
      toast.success("Account deleted successfully.");
      router.push("/");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Something went wrong."));
    },
  });
};
