"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ApiError } from "@/services/api-client";
import { authService } from "@/services/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // -------------------------
  // Form Validation
  // -------------------------
  const validateForm = () => {
    if (!email.trim()) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format.";
    return null;
  };

  // -------------------------
  // Handle Submit
  // -------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setLoading(true);

      await authService.forgotPassword({ email });

      toast.success("OTP sent to your email. It is valid for 10 minutes.");

      // Optionally redirect to Verify OTP page
      setTimeout(() => {
        router.push("/verify-otp");
      }, 1500);
    } catch (err: unknown) {
      const message =
        err instanceof ApiError && err.status === 404
          ? "No account found with this email."
          : err instanceof Error
            ? err.message
            : "Failed to send OTP. Try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full  flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-indigo-600 backdrop-blur-sm bg-black/10 p-6 sm:p-8 md:p-14 md:py-17 flex flex-col gap-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="bg-gradient-to-r from-[#F262B5] to-[#9F73F1] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl font-bold font-hk uppercase">
            Forgot Password
          </h1>
          <center>
            {" "}
            <p className="text-neutral-50/60 text-sm sm:text-base font-semibold font-hk max-w-[400px]">
              Enter your registered email to receive a password reset OTP
            </p>
          </center>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-2">
            <Label className="text-neutral-50 font-semibold">Email</Label>
            <Input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-neutral-50/30 text-white focus:border-blue-600"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-l from-blue-600 via-cyan-600 to-blue-700 text-white text-base sm:text-lg font-semibold hover:opacity-90 py-3"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>

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

export default ForgotPasswordForm;
