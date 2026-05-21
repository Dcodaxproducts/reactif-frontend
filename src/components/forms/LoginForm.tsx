"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import {
  AuthFormShell,
  AuthInlineLink,
  AuthSubmitButton,
  AuthTextField,
} from "@/components/forms/AuthFormShell";
import { useLogin } from "@/hooks/useAuth";
import { getSchemaValidationMessage, loginSchema } from "@/validations/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirectUrl =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("redirect")
      : null;
  const loginMutation = useLogin(redirectUrl);
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
    <AuthFormShell
      title="Login Your Account"
      description="Join ReactIf Printing and Design Today"
      footer
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthTextField
          label="Email"
          placeholder="Enter Your Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthTextField
          label="Password"
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="text-right -mt-4">
          <Link
            href="/forgot-password"
            className="text-blue-600 text-sm font-semibold"
          >
            Forgot Password?
          </Link>
        </div>

        <AuthSubmitButton type="submit" disabled={loading} className="-mt-2">
          {loading ? "Logging in..." : "Login"}
        </AuthSubmitButton>

        <AuthInlineLink href="/register" label="Sign up">
          Don’t Have an Account?
        </AuthInlineLink>
      </form>
    </AuthFormShell>
  );
}
