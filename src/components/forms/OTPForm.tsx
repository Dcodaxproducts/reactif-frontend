"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
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
import { useResendAuthCode, useVerifyAuth } from "@/hooks/useAuth";
import { otpSchema, type OtpFormValues } from "@/validations/auth";

const OTPForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [countdown, setCountdown] = useState(60);
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

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

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

    try {
      await resendOtpMutation.mutateAsync({ email });
      setCountdown(60);
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
      <form className={AUTH_FORM_CLASS} onSubmit={handleSubmit(onSubmit)}>
        <AuthTextField
          label="Verification Code"
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

        <AuthSubmitButton type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
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
          Back to
        </AuthInlineLink>
      </form>
    </AuthFormShell>
  );
};

export default OTPForm;
