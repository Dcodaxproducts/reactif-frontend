"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForgotPassword } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import {
  forgotPasswordSchema,
  getSchemaValidationMessage,
} from "@/validations/auth";

const ForgotPasswordForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const forgotPasswordMutation = useForgotPassword();
  const loading = forgotPasswordMutation.isPending;

  const validateForm = () =>
    getSchemaValidationMessage(forgotPasswordSchema, { email });

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
      await forgotPasswordMutation.mutateAsync({ email });

      setTimeout(() => {
        router.push("/verify-otp");
      }, 1500);
    } catch {
      // handled by mutation toast
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
