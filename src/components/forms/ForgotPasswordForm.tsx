"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  AUTH_FORM_CLASS,
  AuthFormShell,
  AuthInlineLink,
  AuthSubmitButton,
  AuthTextField,
} from "@/components/forms/AuthFormShell";
import { useForgotPassword } from "@/hooks/useAuth";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/validations/auth";

const ForgotPasswordForm = () => {
  const forgotPasswordMutation = useForgotPassword();
  const loading = forgotPasswordMutation.isPending;
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      await forgotPasswordMutation.mutateAsync(values);
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
      <form noValidate className={AUTH_FORM_CLASS} onSubmit={handleSubmit(onSubmit)}>
        <AuthTextField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="Enter your registered email"
          error={errors.email?.message}
          {...register("email")}
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
