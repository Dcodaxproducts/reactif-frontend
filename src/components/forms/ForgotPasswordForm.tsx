"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  AuthFormShell,
  AuthInlineLink,
  AuthSubmitButton,
  AuthTextField,
} from "@/components/forms/AuthFormShell";
import { useForgotPassword } from "@/hooks/useAuth";
import {
  forgotPasswordSchema,
  getSchemaValidationMessage,
} from "@/validations/auth";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const forgotPasswordMutation = useForgotPassword();
  const loading = forgotPasswordMutation.isPending;

  const validateForm = () =>
    getSchemaValidationMessage(forgotPasswordSchema, { email });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      await forgotPasswordMutation.mutateAsync({ email });
    } catch {
      // handled by mutation toast
    }
  };

  return (
    <AuthFormShell
      title="Forgot Password"
      description="Enter your registered email to receive a password reset OTP"
      descriptionClassName="mx-auto max-w-[400px]"
      footer
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthTextField
          label="Email"
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthSubmitButton type="submit" disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </AuthSubmitButton>

        <AuthInlineLink href="/login" label="Login">
          Remembered your password?
        </AuthInlineLink>
      </form>
    </AuthFormShell>
  );
};

export default ForgotPasswordForm;
