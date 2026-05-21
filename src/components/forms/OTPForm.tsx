"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  AuthFormShell,
  AuthInlineLink,
  AuthSubmitButton,
  AuthTextField,
} from "@/components/forms/AuthFormShell";
import { Button } from "@/components/ui/button";
import { useResendAuthCode, useVerifyAuth } from "@/hooks/useAuth";
import { getSchemaValidationMessage, otpSchema } from "@/validations/auth";

const OTP_INPUT_CLASS = "text-center tracking-widest text-lg";

const OTPForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const verifyOtpMutation = useVerifyAuth();
  const resendOtpMutation = useResendAuthCode();
  const loading = verifyOtpMutation.isPending || resendOtpMutation.isPending;

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const validateForm = () => getSchemaValidationMessage(otpSchema, { otp });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!navigator.onLine) {
      setError("No internet connection.");
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (!email) {
        throw new Error("Verification email not found. Please sign up again.");
      }

      await verifyOtpMutation.mutateAsync({ email, otp });
      setSuccess("Account verified successfully!");
      setTimeout(() => router.push("/login"), 1200);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Verification failed. Try again.";
      setError(message);
    }
  };

  const handleResend = async () => {
    setError(null);
    setSuccess(null);

    if (!navigator.onLine) {
      setError("No internet connection.");
      return;
    }

    try {
      await resendOtpMutation.mutateAsync({ email });
      setSuccess("A new OTP has been sent to your email.");
      setCountdown(60);
      setCanResend(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to resend OTP. Try again.";
      setError(message);
    }
  };

  return (
    <AuthFormShell
      title="Verify Your Account"
      description="Enter the 5-digit code sent to your email"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthTextField
          label="Verification Code"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={5}
          placeholder="12345"
          className={OTP_INPUT_CLASS}
        />

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm font-medium">{success}</p>
        )}

        <AuthSubmitButton type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </AuthSubmitButton>

        <div className="text-center text-sm text-neutral-50/60">
          {canResend ? (
            <Button
              type="button"
              onClick={handleResend}
              className="text-blue-600 font-semibold"
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
