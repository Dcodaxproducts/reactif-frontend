"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
  AUTH_ERROR_CLASS,
  AUTH_FORM_CLASS,
  AUTH_OTP_INPUT_CLASS,
  AuthFormShell,
  AuthInlineLink,
  AuthResendOtpControl,
  AuthSubmitButton,
  AuthTextField,
  sanitizeOtpInput,
} from "@/components/forms/AuthFormShell";
import { useResendAuthCode, useResetPassword } from "@/hooks/useAuth";
import { useOtpCountdown } from "@/hooks/useOtpCountdown";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "@/validations/auth";

const VerifyOtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const { countdown, restartCountdown } = useOtpCountdown();
  const resetPasswordMutation = useResetPassword();
  const resendOtpMutation = useResendAuthCode();
  const loading = resetPasswordMutation.isPending || resendOtpMutation.isPending;
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
      otp: "",
      newPassword: "",
    },
  });

  const onSubmit = async ({ otp, newPassword }: ResetPasswordValues) => {
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
      restartCountdown();
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
      <form noValidate className={AUTH_FORM_CLASS} onSubmit={handleSubmit(onSubmit)}>
        <AuthTextField
          label="OTP"
          maxLength={5}
          placeholder="12345"
          className={AUTH_OTP_INPUT_CLASS}
          error={errors.otp?.message}
          {...register("otp", { onChange: sanitizeOtpInput })}
        />
        <AuthTextField
          label="New Password"
          type="password"
          autoComplete="new-password"
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

        <AuthResendOtpControl
          countdown={countdown}
          disabled={loading}
          onResend={handleResend}
        />

        <AuthInlineLink href="/login" label="Login">
          Remembered your password?
        </AuthInlineLink>
      </form>
    </AuthFormShell>
  );
};

export default VerifyOtpForm;
