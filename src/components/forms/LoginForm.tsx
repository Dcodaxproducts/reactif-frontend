"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  AUTH_FORM_CLASS,
  AuthFormShell,
  AuthInlineLink,
  AuthSubmitButton,
  AuthTextField,
} from "@/components/forms/AuthFormShell";
import { useLogin } from "@/hooks/useAuth";
import { loginSchema, type LoginFormValues } from "@/validations/auth";

export default function LoginForm() {
  const redirectUrl =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("redirect")
      : null;
  const loginMutation = useLogin(redirectUrl);
  const loading = loginMutation.isPending;
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    if (!navigator.onLine) {
      toast.error("No internet connection.");
      return;
    }

    try {
      await loginMutation.mutateAsync(values);
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
      <form noValidate className={AUTH_FORM_CLASS} onSubmit={handleSubmit(onSubmit)}>
        <AuthTextField
          label="Email"
          placeholder="Enter Your Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <AuthTextField
          label="Password"
          placeholder="Enter Password"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
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
