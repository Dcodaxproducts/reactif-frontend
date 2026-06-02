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
import { useAppTranslation } from "@/hooks/useAppTranslation";
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
  const { t } = useAppTranslation();

  useEffect(() => {
    if (currentUserQuery.isError) {
      clearStoredAuthToken();
      queryClient.removeQueries({ queryKey: authKeys.currentUser() });
    }
  }, [currentUserQuery.isError, queryClient]);

  const logout = () => {
    clearStoredAuthToken();
    queryClient.clear();
    toast.success(t("auth.loggedOutSuccessfully"));
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
  const { t } = useAppTranslation();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: async (data) => {
      const user = getAuthUserFromResponse(data);
      const token = extractAuthToken(data);

      if (user?.isVerified === false) {
        if (token) {
          setStoredAuthToken(token);
        } else {
          clearStoredAuthToken();
        }

        queryClient.removeQueries({ queryKey: authKeys.currentUser() });
        toast.success(t("auth.verifyAccountToContinue"));
        router.push(buildVerificationRoute(user.email));
        return;
      }

      if (token) {
        setStoredAuthToken(token);
        await queryClient.fetchQuery({
          queryKey: authKeys.currentUser(),
          queryFn: getCurrentUser,
        });
      }

      toast.success(t("auth.loginSuccessful"));

      router.push(getSafeRedirectPath(redirectUrl));
      router.refresh();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, t("auth.loginFailed")));
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { t } = useAppTranslation();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
    onSuccess: (data, payload) => {
      const token = extractAuthToken(data);
      const user = getAuthUserFromResponse(data);

      if (token) {
        setStoredAuthToken(token);
      }

      queryClient.removeQueries({ queryKey: authKeys.currentUser() });
      toast.success(t("auth.accountCreatedOtpSent"));
      router.push(buildVerificationRoute(user?.email ?? payload.email));
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(error, t("auth.accountCreationFailed")),
      );
    },
  });
};

export const useVerifyAuth = () => {
  const queryClient = useQueryClient();
  const { t } = useAppTranslation();

  return useMutation<AuthMessageResponse, Error, VerifyAuthPayload>({
    mutationFn: verifyAuth,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.currentUser() });
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(error, t("auth.verificationFailedPleaseTryAgain")),
      );
    },
  });
};

export const useResendAuthCode = () => {
  const { t } = useAppTranslation();

  return useMutation<AuthMessageResponse, Error, ResendAuthCodePayload>({
    mutationFn: resendAuthCode,
    onSuccess: () => {
      toast.success(t("auth.newOtpSent"));
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(error, t("auth.unableToResendCode")),
      );
    },
  });
};

export const useForgotPassword = () => {
  const router = useRouter();
  const { t } = useAppTranslation();

  return useMutation<AuthMessageResponse, Error, ForgotPasswordPayload>({
    mutationFn: forgotPassword,
    onSuccess: (_, payload) => {
      toast.success(t("auth.passwordResetInstructionsSent"));
      router.push(buildResetPasswordRoute(payload.email));
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          t("auth.unableToSendResetInstructions"),
        ),
      );
    },
  });
};

export const useResetPassword = () => {
  const { t } = useAppTranslation();

  return useMutation<AuthMessageResponse, Error, ResetPasswordPayload>({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success(t("auth.passwordResetSuccessfully"));
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(error, t("auth.unableToResetPassword")),
      );
    },
  });
};

export const useChangePassword = () => {
  const { t } = useAppTranslation();

  return useMutation<AuthMessageResponse, Error, ChangePasswordPayload>({
    mutationFn: changePassword,
    onError: (error) => {
      toast.error(
        getErrorMessage(error, t("auth.unableToChangePassword")),
      );
    },
  });
};

export const useVerifyOtp = useVerifyAuth;
export const useResendOtp = useResendAuthCode;
export { buildLoginRoute };
