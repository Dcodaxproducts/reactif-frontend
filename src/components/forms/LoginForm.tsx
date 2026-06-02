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
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useLogin } from "@/hooks/useAuth";
import { createLoginSchema, type LoginFormValues } from "@/validations/auth";

export default function LoginForm() {
  const { t } = useAppTranslation();
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
    resolver: zodResolver(createLoginSchema((key) => t(key))),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    if (!navigator.onLine) {
      toast.error(t("auth.noInternetConnection"));
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
      title={t("auth.loginTitle")}
      description={t("auth.authDescription")}
      footer
    >
      <form
        noValidate
        className={AUTH_FORM_CLASS}
        onSubmit={handleSubmit(onSubmit)}
      >
        <AuthTextField
          label={t("auth.email")}
          placeholder={t("auth.enterYourEmail")}
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <AuthTextField
          label={t("auth.password")}
          placeholder={t("auth.enterPassword")}
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
            {t("auth.forgotPasswordLink")}
          </Link>
        </div>

        <AuthSubmitButton type="submit" disabled={loading} className="-mt-2">
          {loading ? t("auth.loggingIn") : t("auth.login")}
        </AuthSubmitButton>

        <AuthInlineLink href="/register" label={t("auth.signUp")}>
          {t("auth.noAccount")}
        </AuthInlineLink>
      </form>
    </AuthFormShell>
  );
}
