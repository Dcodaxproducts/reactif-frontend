import { apiClient } from "@/services/api-client";
import type { ApiItemResponse } from "@/types/categories";
import type { BackendUserProfile, ProfileFormPayload } from "@/types/profile";

export const profileService = {
  detail(token: string) {
    return apiClient<ApiItemResponse<BackendUserProfile>>("/user-detail", {
      token,
      headers: {
        Accept: "application/json",
      },
    });
  },

  update(payload: ProfileFormPayload, token: string) {
    const body = new FormData();
    body.append("name", payload.name);
    body.append("email", payload.email);
    body.append("phone", payload.phone);
    body.append("bio", payload.bio);
    body.append("address", payload.address);

    if (payload.avatarFile) {
      body.append("profile_image", payload.avatarFile);
    }

    return apiClient<ApiItemResponse<BackendUserProfile>>("/update-profile", {
      method: "POST",
      token,
      headers: {
        Accept: "application/json",
      },
      body,
    });
  },

  deleteAccount(token: string) {
    return apiClient<{ message?: string }>("/delete-user-account", {
      method: "POST",
      token,
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ confirmation: "DELETE" }),
    });
  },
};
