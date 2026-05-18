"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  forgotPassword,
  loginUser,
  registerUser,
  resendOtp,
  resetPassword,
  validateSession,
  verifyOtp,
  type ForgotPasswordPayload,
  type ResendOtpPayload,
  type ResetPasswordPayload,
  type VerifyOtpPayload,
} from "@/services/auth";
import type { AuthUser, LoginPayload, RegisterPayload } from "@/types/auth";

export type User = AuthUser;

/**
 * ==============================
 * QUERY KEYS
 * ==============================
 */

export const authKeys = {
  all: ["auth"] as const,
  currentUser: () => ["auth", "current-user"] as const,
  session: () => ["auth", "session"] as const,
};

/**
 * ==============================
 * SESSION HOOKS
 * ==============================
 */

export const useValidateSession = (enabled = false) => {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: validateSession,
    enabled,
  });
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const validateStoredSession = async () => {
      const token = localStorage.getItem("sessionToken");
      const storedUser = localStorage.getItem("current_user");

      if (!token || !storedUser) {
        setLoading(false);
        return;
      }

      try {
        const parsedUser: User = JSON.parse(storedUser);

        await validateSession();

        if (!parsedUser.isVerified) {
          router.push("/register/enter-otp");
          setLoading(false);
          return;
        }

        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem("sessionToken");
        localStorage.removeItem("current_user");
        setUser(null);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    validateStoredSession();
  }, [router]);

  const logout = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("current_user");
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return { user, loading, logout };
};

/**
 * ==============================
 * AUTH MUTATION HOOKS
 * ==============================
 */

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (data) => {
      if (data.sessionToken)
        localStorage.setItem("sessionToken", data.sessionToken);

      const userObject = {
        userId: data.userId,
        email: data.email,
        displayName: data.displayName,
        isVerified: data.isVerified ?? false,
      };

      localStorage.setItem("current_user", JSON.stringify(userObject));
      queryClient.setQueryData(authKeys.currentUser(), userObject);
      toast.success(
        userObject.isVerified
          ? "Login Successful!"
          : "Account created, please verify OTP!",
      );

      if (!userObject.isVerified) {
        router.push("/verify-otp");
        return;
      }

      const redirectUrl = localStorage.getItem("redirectAfterLogin");
      if (redirectUrl) {
        localStorage.removeItem("redirectAfterLogin");
        router.push(redirectUrl);
      } else {
        router.push("/");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Invalid email or password."));
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
    onSuccess: (data) => {
      if (data.sessionToken)
        localStorage.setItem("sessionToken", data.sessionToken);

      const userObject = {
        userId: data.userId,
        email: data.email,
        displayName: data.displayName,
        isVerified: data.isVerified ?? false,
      };

      localStorage.setItem("current_user", JSON.stringify(userObject));
      queryClient.setQueryData(authKeys.currentUser(), userObject);
      toast.success("Account created successfully! OTP sent to your email.");
      router.push("/register/enter-otp");
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(error, "Account creation failed. Try again."),
      );
    },
  });
};

export const useVerifyOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => verifyOtp(payload),
    onSuccess: () => {
      const storedUser = localStorage.getItem("current_user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        parsedUser.isVerified = true;
        localStorage.setItem("current_user", JSON.stringify(parsedUser));
        queryClient.setQueryData(authKeys.currentUser(), parsedUser);
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Verification failed. Try again."));
    },
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: (payload: ResendOtpPayload) => resendOtp(payload),
    onSuccess: () => {
      toast.success("A new OTP has been sent to your email.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to resend OTP."));
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
    onSuccess: () => {
      toast.success("OTP sent to your email. It is valid for 10 minutes.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to send OTP. Try again."));
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
    onSuccess: () => {
      toast.success("Password reset successfully!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Reset failed. Try again."));
    },
  });
};
