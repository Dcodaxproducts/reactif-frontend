"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getErrorMessage } from "@/lib/errors";
import {
  changePassword,
  forgotPassword,
  getCurrentUser,
  loginUser,
  registerUser,
  resendAuthCode,
  resetPassword,
  verifyAuth,
  type AuthMessageResponse,
  type ChangePasswordPayload,
  type ForgotPasswordPayload,
  type ResendAuthCodePayload,
  type ResetPasswordPayload,
  type VerifyAuthPayload,
} from "@/services/auth";
import type { AuthResponse, AuthUser, LoginPayload, RegisterPayload } from "@/types/auth";

export type User = AuthUser;

export const AUTH_TOKEN_KEY = "sessionToken";
export const VERIFICATION_EMAIL_KEY = "verificationEmail";
export const RESET_EMAIL_KEY = "resetEmail";

export const authKeys = {
  all: ["auth"] as const,
  currentUser: () => ["auth", "current-user"] as const,
};

const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
};

const getAuthTokenFromResponse = (data: AuthResponse) => data.sessionToken || null;

const clearAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

const saveAuthToken = (data: AuthResponse) => {
  const token = getAuthTokenFromResponse(data);

  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
};

const saveVerificationEmail = (email: string) => {
  localStorage.setItem(VERIFICATION_EMAIL_KEY, email);
};

const clearVerificationEmail = () => {
  localStorage.removeItem(VERIFICATION_EMAIL_KEY);
};

const saveResetEmail = (email: string) => {
  localStorage.setItem(RESET_EMAIL_KEY, email);
};

const getAuthUserFromResponse = (data: AuthResponse): AuthUser | null => {
  if (data.user) return data.user;
  if (!data.email) return null;

  return {
    userId: data.userId ?? data.id ?? 0,
    email: data.email,
    displayName: data.displayName ?? data.name ?? data.email,
    isVerified: data.isVerified ?? true,
  };
};

const getVerificationRoute = () => "/register/enter-otp";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: getCurrentUser,
    enabled: typeof window !== "undefined" && Boolean(getAuthToken()),
    retry: false,
  });
};

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const currentUserQuery = useCurrentUser();

  const logout = () => {
    clearAuthToken();
    clearVerificationEmail();
    localStorage.removeItem(RESET_EMAIL_KEY);
    queryClient.clear();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return {
    user: currentUserQuery.data ?? null,
    loading: currentUserQuery.isLoading,
    logout,
  };
};

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (data) => {
      saveAuthToken(data);

      const user = getAuthUserFromResponse(data);
      if (user) queryClient.setQueryData(authKeys.currentUser(), user);

      toast.success(
        user?.isVerified === false
          ? "Account created, please verify OTP!"
          : "Login successful",
      );

      if (user?.isVerified === false) {
        if (user.email) saveVerificationEmail(user.email);
        router.push(getVerificationRoute());
        return;
      }

      const redirectUrl = localStorage.getItem("redirectAfterLogin");
      if (redirectUrl) {
        localStorage.removeItem("redirectAfterLogin");
        router.push(redirectUrl);
      } else {
        router.push("/");
      }
      router.refresh();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Login failed. Please try again."));
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
    onSuccess: (_, payload) => {
      saveVerificationEmail(payload.email);
      queryClient.removeQueries({ queryKey: authKeys.currentUser() });
      toast.success("Account created successfully! OTP sent to your email.");
      router.push(getVerificationRoute());
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(error, "Account creation failed. Try again."),
      );
    },
  });
};

export const useVerifyAuth = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthMessageResponse, Error, VerifyAuthPayload>({
    mutationFn: verifyAuth,
    onSuccess: () => {
      clearVerificationEmail();
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(error, "Verification failed. Please try again."),
      );
    },
  });
};

export const useResendAuthCode = () => {
  return useMutation<AuthMessageResponse, Error, ResendAuthCodePayload>({
    mutationFn: resendAuthCode,
    onSuccess: () => {
      toast.success("A new OTP has been sent to your email.");
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(error, "Unable to resend code. Please try again."),
      );
    },
  });
};

export const useForgotPassword = () => {
  const router = useRouter();

  return useMutation<AuthMessageResponse, Error, ForgotPasswordPayload>({
    mutationFn: forgotPassword,
    onSuccess: (_, payload) => {
      saveResetEmail(payload.email);
      toast.success("Password reset instructions sent. Please check your email.");
      router.push("/verify-otp");
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          "Unable to send reset instructions. Please try again.",
        ),
      );
    },
  });
};

export const useResetPassword = () => {
  return useMutation<AuthMessageResponse, Error, ResetPasswordPayload>({
    mutationFn: resetPassword,
    onSuccess: () => {
      localStorage.removeItem(RESET_EMAIL_KEY);
      toast.success("Password reset successfully!");
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(error, "Unable to reset password. Please try again."),
      );
    },
  });
};

export const useChangePassword = () => {
  return useMutation<AuthMessageResponse, Error, ChangePasswordPayload>({
    mutationFn: changePassword,
    onError: (error) => {
      toast.error(
        getErrorMessage(error, "Unable to change password. Please try again."),
      );
    },
  });
};

export const useVerifyOtp = useVerifyAuth;
export const useResendOtp = useResendAuthCode;
