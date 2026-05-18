import { apiClient } from "@/services/api-client";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";

export const authService = {
  login(payload: LoginPayload) {
    return apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  register(payload: RegisterPayload) {
    return apiClient<AuthResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  validateSession(token: string) {
    return apiClient<unknown>("/auth/validate", {
      token,
    });
  },

  verifyOtp(payload: Record<string, unknown>) {
    return apiClient<unknown>("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  forgotPassword(payload: Record<string, unknown>) {
    return apiClient<unknown>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
