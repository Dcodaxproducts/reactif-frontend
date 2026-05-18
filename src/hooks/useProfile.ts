"use client";

import { useCallback, useEffect, useState } from "react";
import { profileService } from "@/services/profile";
import type { UserProfile } from "@/types/profile";

const mapProfile = (backendUser: any, isVerified = false): UserProfile => ({
  id: backendUser.id,
  name: backendUser.name,
  email: backendUser.email,
  phone: backendUser.contact_number,
  avatar: backendUser.profile_image,
  address: backendUser.address,
  bio: backendUser.bio,
  created_at: backendUser.created_at,
  updated_at: backendUser.updated_at,
  is_verified: isVerified,
});

export const useProfile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem("sessionToken");
    if (!token) {
      setError("Session expired. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const result = await profileService.detail(token);
      const storedUser = JSON.parse(localStorage.getItem("current_user") || "{}");
      const mergedUser = mapProfile(result.data, storedUser.isVerified ?? false);
      localStorage.setItem("current_user", JSON.stringify({ ...storedUser, ...mergedUser }));
      setUser(mergedUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { user, loading, error, refetch: fetchProfile };
};
