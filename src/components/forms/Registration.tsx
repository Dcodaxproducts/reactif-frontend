"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  AUTH_ERROR_CLASS,
  AUTH_FORM_CLASS,
  AUTH_FORM_GRID_CLASS,
  AUTH_SUCCESS_CLASS,
  AuthFormShell,
  AuthInlineLink,
  AuthPasswordField,
  AuthSubmitButton,
  AuthTextField,
} from "@/components/forms/AuthFormShell";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useRegister } from "@/hooks/useAuth";
import {
  createRegisterSchema,
  type RegistrationFormValues,
} from "@/validations/auth";

export default function RegistrationForm() {
  const { t } = useAppTranslation();
  const registerMutation = useRegister();
  const loading = registerMutation.isPending;
  const {
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    register,
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(createRegisterSchema((key) => t(key))),
    defaultValues: {
      fullName: "",
      username: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({
    fullName,
    email,
    phone,
    password,
  }: RegistrationFormValues) => {
    if (!navigator.onLine) {
      toast.error(t("auth.noInternetConnection"));
      return;
    }

    try {
      await registerMutation.mutateAsync({ fullName, email, phone, password });
    } catch {
      // handled by mutation toast
    }
  };

  return (
    <AuthFormShell
      title={t("auth.registerTitle")}
      description={t("auth.authDescription")}
    >
      <form
        noValidate
        className={AUTH_FORM_CLASS}
        onSubmit={handleSubmit(onSubmit)}
      >
        <AuthTextField
          label={t("auth.fullName")}
          placeholder={t("auth.enterFullName")}
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <div className={AUTH_FORM_GRID_CLASS}>
          <AuthTextField
            label={t("auth.usernameOptional")}
            placeholder={t("auth.enterUsername")}
            error={errors.username?.message}
            {...register("username")}
          />
          <AuthTextField
            label={t("auth.phoneNumber")}
            placeholder={t("auth.enterPhoneNumber")}
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        <AuthTextField
          label={t("auth.email")}
          type="email"
          autoComplete="email"
          placeholder={t("auth.enterYourEmail")}
          error={errors.email?.message}
          {...register("email")}
        />
        <AuthPasswordField
          label={t("auth.password")}
          autoComplete="new-password"
          placeholder={t("auth.enterPassword")}
          error={errors.password?.message}
          {...register("password")}
        />
        <AuthPasswordField
          label={t("auth.confirmPassword")}
          autoComplete="new-password"
          placeholder={t("auth.enterConfirmPassword")}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {registerMutation.isError && (
          <p className={AUTH_ERROR_CLASS}>{t("common.error")}</p>
        )}
        {isSubmitSuccessful && !registerMutation.isError && (
          <p className={AUTH_SUCCESS_CLASS}>
            {t("auth.accountCreatedVerify")}
          </p>
        )}

        <AuthSubmitButton type="submit" disabled={loading}>
          {loading ? t("auth.creatingAccount") : t("auth.register")}
        </AuthSubmitButton>

        <AuthInlineLink href="/login" label={t("auth.signIn")}>
          {t("auth.alreadyHaveAccount")}
        </AuthInlineLink>
      </form>
    </AuthFormShell>
  );
}
