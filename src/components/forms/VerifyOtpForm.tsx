"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  AuthFormShell,
  AuthInlineLink,
  AuthSubmitButton,
  AuthTextField,
} from "@/components/forms/AuthFormShell";
import { Button } from "@/components/ui/button";
import { useResendOtp, useResetPassword } from "@/hooks/useAuth";
import {
  getSchemaValidationMessage,
  resetPasswordSchema,
} from "@/validations/auth";

const OTP_INPUT_CLASS = "text-center tracking-widest text-lg";

const VerifyOtpForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const resetPasswordMutation = useResetPassword();
  const resendOtpMutation = useResendOtp();
  const loading =
    resetPasswordMutation.isPending || resendOtpMutation.isPending;

  useEffect(() => {
    const storedUser = localStorage.getItem("current_user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setEmail(parsed.email || "");
    }
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const validateForm = () =>
    getSchemaValidationMessage(resetPasswordSchema, {
      email,
      otp,
      newPassword,
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

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
      setCanResend(false);
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
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthTextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthTextField
          label="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={5}
          placeholder="12345"
          className={OTP_INPUT_CLASS}
        />
        <AuthTextField
          label="New Password"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <AuthSubmitButton type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
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
          Remembered your password?
        </AuthInlineLink>
      </form>
    </AuthFormShell>
  );
};

export default VerifyOtpForm;
