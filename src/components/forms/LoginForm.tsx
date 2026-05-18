"use client";

import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import { useLogin } from "@/hooks/useAuth";
import { getSchemaValidationMessage, loginSchema } from "@/validations/auth";
import { toast } from "sonner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const loading = loginMutation.isPending;

  const validateForm = () =>
    getSchemaValidationMessage(loginSchema, { email, password });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!navigator.onLine) {
      toast.error("No internet connection.");
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      await loginMutation.mutateAsync({ email, password });
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
            Login Your Account
          </h1>
          <p className="text-neutral-50/60 text-sm sm:text-base font-semibold font-hk">
            Join ReactIf Printing and Design Today
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-2">
            <Label className="text-neutral-50 text-base font-semibold">
              Email
            </Label>
            <Input
              placeholder="Enter Your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-neutral-50/30 text-white focus:border-blue-600"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label className="text-neutral-50 text-base font-semibold">
              Password
            </Label>
            <Input
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-neutral-50/30 text-white focus:border-blue-600"
            />
            <div className="text-right mt-2">
              <Link
                href="/forgot-password"
                className="text-blue-600 text-sm font-semibold"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Checkbox */}
          {/* <div className="flex items-center justify-between border border-neutral-50/30 rounded-md p-3">
            <div className="flex items-center gap-3">
              <Checkbox checked={rememberMe} />
              <span className="text-neutral-50/60 text-sm">I am not a robot</span>
            </div>
            <div className="w-10 h-10 bg-neutral-400 rounded-sm" />
          </div> */}

          {/* Error */}
          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="-mt-2 w-full bg-gradient-to-l from-blue-600 via-cyan-600 to-blue-700 text-white text-base sm:text-lg font-semibold hover:opacity-90 py-3"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* Signup Link */}
          <p className="text-center text-sm sm:text-base font-semibold text-neutral-50/60">
            Don’t Have an Account?{" "}
            <Link href="/register" className="text-blue-600">
              Sign up
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
}
