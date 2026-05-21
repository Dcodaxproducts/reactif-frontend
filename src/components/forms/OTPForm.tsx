"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
  AUTH_FORM_CLASS,
  AUTH_OTP_INPUT_CLASS,
  AuthFormShell,
  AuthInlineLink,
  AuthResendOtpControl,
  AuthSubmitButton,
  AuthTextField,
  sanitizeOtpInput,
} from "@/components/forms/AuthFormShell";
import { useResendAuthCode, useVerifyAuth } from "@/hooks/useAuth";
import { useOtpCountdown } from "@/hooks/useOtpCountdown";
import { otpSchema, type OtpFormValues } from "@/validations/auth";

const OTPForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const { countdown, restartCountdown } = useOtpCountdown();
  const verifyOtpMutation = useVerifyAuth();
  const resendOtpMutation = useResendAuthCode();
  const loading = verifyOtpMutation.isPending || resendOtpMutation.isPending;
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async ({ otp }: OtpFormValues) => {
    if (!navigator.onLine) {
      toast.error("No internet connection.");
      return;
    }

    try {
      if (!email) {
        throw new Error("Verification email not found. Please sign up again.");
      }

      await verifyOtpMutation.mutateAsync({ email, otp });
      toast.success("Account verified successfully!");
      setTimeout(() => router.push("/login"), 1200);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Verification failed. Try again.";
      toast.error(message);
    }
  };

  const handleResend = async () => {
    if (!navigator.onLine) {
      toast.error("No internet connection.");
      return;
    }

    if (!email) {
      toast.error("No email available to resend OTP.");
      return;
    }

    try {
      await resendOtpMutation.mutateAsync({ email });
      restartCountdown();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to resend OTP. Try again.";
      toast.error(message);
    }
  };

  return (
    <AuthFormShell
      title="Verify Your Account"
      description="Enter the 5-digit code sent to your email"
    >
      <form noValidate className={AUTH_FORM_CLASS} onSubmit={handleSubmit(onSubmit)}>
        <AuthTextField
          label="Verification Code"
          maxLength={5}
          placeholder="12345"
          className={AUTH_OTP_INPUT_CLASS}
          error={errors.otp?.message}
          {...register("otp", { onChange: sanitizeOtpInput })}
        />

        <AuthSubmitButton type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </AuthSubmitButton>

        <AuthResendOtpControl
          countdown={countdown}
          disabled={loading}
          onResend={handleResend}
        />

        <AuthInlineLink href="/login" label="Login">
          Back to
        </AuthInlineLink>
      </form>
    </AuthFormShell>
  );
};

export default OTPForm;
