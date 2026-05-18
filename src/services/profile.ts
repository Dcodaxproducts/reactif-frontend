import api from "@/lib/axios";
import type { ApiItemResponse } from "@/types/api";
import type { BackendUserProfile, ProfileFormPayload } from "@/types/profile";

/**
 * ==============================
 * TYPES
 * ==============================
 */

export type DeleteAccountResponse = {
  message?: string;
};

/**
 * ==============================
 * ROUTES
 * ==============================
 */

export const PROFILE_ROUTES = {
  detail: "/user-detail",
  update: "/update-profile",
  deleteAccount: "/delete-user-account",
};

/**
 * ==============================
 * HELPERS
 * ==============================
 */

const createProfileFormData = (payload: ProfileFormPayload) => {
  const body = new FormData();
  body.append("name", payload.name);
  body.append("email", payload.email);
  body.append("phone", payload.phone);
  body.append("bio", payload.bio);
  body.append("address", payload.address);

  if (payload.avatarFile) {
    body.append("profile_image", payload.avatarFile);
  }

  return body;
};

/**
 * ==============================
 * PROFILE APIS
 * ==============================
 */

export const getUserProfile = async (): Promise<
  ApiItemResponse<BackendUserProfile>
> => {
  const { data } = await api.get<ApiItemResponse<BackendUserProfile>>(
    PROFILE_ROUTES.detail,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  return data;
};

export const updateUserProfile = async (
  payload: ProfileFormPayload,
): Promise<ApiItemResponse<BackendUserProfile>> => {
  const { data } = await api.post<ApiItemResponse<BackendUserProfile>>(
    PROFILE_ROUTES.update,
    createProfileFormData(payload),
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};

export const deleteUserAccount = async (): Promise<DeleteAccountResponse> => {
  const { data } = await api.post<DeleteAccountResponse>(
    PROFILE_ROUTES.deleteAccount,
    {
      confirmation: "DELETE",
    },
  );

  return data;
};
