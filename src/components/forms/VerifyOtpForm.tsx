"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useResendOtp, useResetPassword } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import {
  getSchemaValidationMessage,
  resetPasswordSchema,
} from "@/validations/auth";

const VerifyOtpForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const resetPasswordMutation = useResetPassword();
  const resendOtpMutation = useResendOtp();
  const loading =
    resetPasswordMutation.isPending || resendOtpMutation.isPending;
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // -------------------------
  // Load stored email from forgot-password flow
  // -------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem("current_user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setEmail(parsed.email || "");
    }
  }, []);

  // -------------------------
  // Countdown timer for Resend OTP
  // -------------------------
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

  // -------------------------
  // Submit Handler
  // -------------------------
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

  // -------------------------
  // Resend OTP Handler
  // -------------------------
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
    <section className="w-full min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-indigo-600 backdrop-blur-sm bg-black/10 p-6 sm:p-8 md:p-14 md:py-17 flex flex-col gap-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="bg-gradient-to-r from-[#F262B5] to-[#9F73F1] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl font-bold font-hk uppercase">
            Reset Password
          </h1>
          <p className="text-neutral-50/60 text-sm sm:text-base font-semibold font-hk">
            Enter OTP sent to your email and choose a new password
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email (readonly) */}
          <div className="space-y-2">
            <Label className="text-neutral-50 font-semibold">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-neutral-50/30 text-white"
            />
          </div>

          {/* OTP */}
          <div className="space-y-2">
            <Label className="text-neutral-50 font-semibold">OTP</Label>
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={5}
              placeholder="12345"
              className="bg-transparent border-neutral-50/30 text-white text-center tracking-widest text-lg focus:border-blue-600"
            />
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label className="text-neutral-50 font-semibold">
              New Password
            </Label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-transparent border-neutral-50/30 text-white focus:border-blue-600"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-l from-blue-600 via-cyan-600 to-blue-700 text-white text-base sm:text-lg font-semibold hover:opacity-90 py-3"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>

          {/* Resend OTP */}
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

          {/* Back to Login */}
          <p className="text-center text-sm sm:text-base font-semibold text-neutral-50/60">
            Remembered your password?{" "}
            <Link href="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>

        {/* Footer */}
        <div className="text-center text-neutral-50/60 text-xs sm:text-sm">
          © 2026 ReactIf Printing & Design. All rights reserved
        </div>
      </div>
    </section>
  );
};

export default VerifyOtpForm;
