"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  buildLoginRoute,
  buildResetPasswordRoute,
  buildVerificationRoute,
  getSafeRedirectPath,
} from "@/lib/auth-routes";
import {
  clearInvalidAuthSession,
  extractAuthToken,
  mapAuthUser,
} from "@/lib/auth-response";
import {
  clearStoredAuthToken,
  getStoredAuthToken,
  setStoredAuthToken,
  subscribeToAuthTokenChange,
} from "@/lib/auth-token";
import { getErrorMessage } from "@/lib/errors";
import {
  changePassword,
  forgotPassword,
  getCurrentUser,
  loginUser,
  registerUser,
  resendAuthCode,
  resetPassword,
  validateAuthSession,
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

export const authKeys = {
  all: ["auth"] as const,
  currentUser: () => ["auth", "current-user"] as const,
};

const getAuthUserFromResponse = (data: AuthResponse): AuthUser | null =>
  mapAuthUser(data);

function useAuthToken() {
  const [token, setToken] = useState<string | null>(() => getStoredAuthToken());

  useEffect(() => subscribeToAuthTokenChange(() => setToken(getStoredAuthToken())), []);

  return token;
}

export const useCurrentUser = () => {
  const token = useAuthToken();

  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: async () => {
      const isValid = await validateAuthSession();

      if (!isValid) {
        clearInvalidAuthSession();
        throw new Error("Invalid auth session");
      }

      return getCurrentUser();
    },
    enabled: Boolean(token),
    retry: false,
  });
};

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const currentUserQuery = useCurrentUser();

  useEffect(() => {
    if (currentUserQuery.isError) {
      clearStoredAuthToken();
      queryClient.removeQueries({ queryKey: authKeys.currentUser() });
    }
  }, [currentUserQuery.isError, queryClient]);

  const logout = () => {
    clearStoredAuthToken();
    queryClient.clear();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const verifiedUser = currentUserQuery.data?.isVerified
    ? currentUserQuery.data
    : null;

  return {
    user: verifiedUser,
    loading: currentUserQuery.isLoading,
    logout,
  };
};

export const useLogin = (redirectUrl?: string | null) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: async (data) => {
      const user = getAuthUserFromResponse(data);

      if (user?.isVerified === false) {
        clearStoredAuthToken();
        queryClient.removeQueries({ queryKey: authKeys.currentUser() });
        toast.success("Please verify your account to continue.");
        router.push(buildVerificationRoute(user.email));
        return;
      }

      const token = extractAuthToken(data);

      if (token) {
        setStoredAuthToken(token);
        await queryClient.fetchQuery({
          queryKey: authKeys.currentUser(),
          queryFn: getCurrentUser,
        });
      }

      toast.success("Login successful");

      router.push(getSafeRedirectPath(redirectUrl));
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
      queryClient.removeQueries({ queryKey: authKeys.currentUser() });
      toast.success("Account created successfully! OTP sent to your email.");
      router.push(buildVerificationRoute(payload.email));
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
      queryClient.removeQueries({ queryKey: authKeys.currentUser() });
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
      toast.success("Password reset instructions sent. Please check your email.");
      router.push(buildResetPasswordRoute(payload.email));
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
export { buildLoginRoute };
