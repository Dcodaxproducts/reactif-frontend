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
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useForgotPassword } from "@/hooks/useAuth";
import {
  createForgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/validations/auth";

const ForgotPasswordForm = () => {
  const { t } = useAppTranslation();
  const forgotPasswordMutation = useForgotPassword();
  const loading = forgotPasswordMutation.isPending;
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(createForgotPasswordSchema((key) => t(key))),
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
      title={t("auth.forgotPasswordTitle")}
      description={t("auth.forgotPasswordDescription")}
      descriptionClassName="mx-auto max-w-[400px]"
      footer
    >
      <form
        noValidate
        className={AUTH_FORM_CLASS}
        onSubmit={handleSubmit(onSubmit)}
      >
        <AuthTextField
          label={t("auth.email")}
          type="email"
          autoComplete="email"
          placeholder={t("auth.enterRegisteredEmail")}
          error={errors.email?.message}
          {...register("email")}
        />

        <AuthSubmitButton type="submit" disabled={loading}>
          {loading ? t("auth.sendingOtp") : t("auth.sendOtp")}
        </AuthSubmitButton>

        <AuthInlineLink href="/login" label={t("auth.login")}>
          {t("auth.rememberedPassword")}
        </AuthInlineLink>
      </form>
    </AuthFormShell>
  );
};

export default ForgotPasswordForm;
