"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
  AUTH_ERROR_CLASS,
  AUTH_FORM_CLASS,
  AUTH_OTP_INPUT_CLASS,
  AUTH_RESEND_BUTTON_CLASS,
  AUTH_RESEND_ROW_CLASS,
  AuthFormShell,
  AuthInlineLink,
  AuthSubmitButton,
  AuthTextField,
} from "@/components/forms/AuthFormShell";
import { Button } from "@/components/ui/button";
import { useResendAuthCode, useResetPassword } from "@/hooks/useAuth";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/validations/auth";

const VerifyOtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [countdown, setCountdown] = useState(60);
  const resetPasswordMutation = useResetPassword();
  const resendOtpMutation = useResendAuthCode();
  const loading = resetPasswordMutation.isPending || resendOtpMutation.isPending;
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
      otp: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const onSubmit = async ({ otp, newPassword }: ResetPasswordFormValues) => {
    try {
      await resetPasswordMutation.mutateAsync({ email, otp, newPassword });
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      // handled by mutation toast
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("No email available to resend OTP.");
      return;
    }

    try {
      await resendOtpMutation.mutateAsync({ email });
      setCountdown(60);
    } catch {
      // handled by mutation toast
    }
  };

  return (
    <AuthFormShell
      title="Reset Password"
      description="Enter OTP sent to your email and choose a new password"
      footer
    >
      <form className={AUTH_FORM_CLASS} onSubmit={handleSubmit(onSubmit)}>
        <AuthTextField
          label="OTP"
          maxLength={5}
          placeholder="12345"
          className={AUTH_OTP_INPUT_CLASS}
          error={errors.otp?.message}
          {...register("otp", {
            onChange: (event) => {
              event.target.value = event.target.value.replace(/\D/g, "");
            },
          })}
        />
        <AuthTextField
          label="New Password"
          type="password"
          placeholder="Enter new password"
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />

        {errors.email?.message && (
          <p className={AUTH_ERROR_CLASS}>{errors.email.message}</p>
        )}

        <AuthSubmitButton type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </AuthSubmitButton>

        <div className={AUTH_RESEND_ROW_CLASS}>
          {countdown <= 0 ? (
            <Button
              type="button"
              onClick={handleResend}
              className={AUTH_RESEND_BUTTON_CLASS}
            >
              Resend OTP
            </Button>
          ) : (
            <span>Resend OTP in {countdown}s</span>
          )}
        </div>

        <AuthInlineLink href="/login" label="Login">
          Remembered your password?
        </AuthInlineLink>
      </form>
    </AuthFormShell>
  );
};

export default VerifyOtpForm;
