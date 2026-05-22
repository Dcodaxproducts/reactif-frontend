"use client";

import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { clearStoredAuthToken } from "@/lib/auth-token";
import { getErrorMessage } from "@/lib/errors";
import { getImageSource } from "@/lib/image-source";
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

export const profileKeys = {
  all: ["profile"] as const,
  detail: () => ["profile", "detail"] as const,
};

const mapProfile = (
  backendUser: BackendUserProfile,
  isVerified = false,
): UserProfile => {
  const {
    id,
    name,
    email,
    contact_number,
    profile_image,
    address,
    bio,
    created_at,
    updated_at,
  } = backendUser;

  return {
    id,
    name,
    email,
    phone: contact_number ?? "",
    avatar: profile_image ? getImageSource(profile_image, "") || null : null,
    address: address ?? "",
    bio: bio ?? "",
    created_at,
    updated_at,
    is_verified: isVerified,
  };
};

export const useProfile = () => {
  const query = useQuery({
    queryKey: profileKeys.detail(),
    queryFn: getUserProfile,
  });

  const mappedProfile = useMemo(
    () => (query.data?.data ? mapProfile(query.data.data, true) : null),
    [query.data],
  );

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
    onSuccess: () => {
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
      clearStoredAuthToken();
      queryClient.clear();
      toast.success("Account deleted successfully.");
      router.push("/");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Something went wrong."));
    },
  });
};
