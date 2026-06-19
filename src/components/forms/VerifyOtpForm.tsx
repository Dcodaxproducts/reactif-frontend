"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
  AUTH_ERROR_CLASS,
  AUTH_FORM_CLASS,
  AUTH_OTP_INPUT_CLASS,
  AuthFormShell,
  AuthInlineLink,
  AuthPasswordField,
  AuthResendOtpControl,
  AuthSubmitButton,
  AuthTextField,
  sanitizeOtpInput,
} from "@/components/forms/AuthFormShell";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useResendAuthCode, useResetPassword } from "@/hooks/useAuth";
import { useOtpCountdown } from "@/hooks/useOtpCountdown";
import {
  createResetPasswordSchema,
  type ResetPasswordValues,
} from "@/validations/auth";

const VerifyOtpForm = () => {
  const { t } = useAppTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const { countdown, restartCountdown } = useOtpCountdown();
  const resetPasswordMutation = useResetPassword();
  const resendOtpMutation = useResendAuthCode();
  const loading = resetPasswordMutation.isPending || resendOtpMutation.isPending;
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(createResetPasswordSchema((key) => t(key))),
    defaultValues: {
      email,
      otp: "",
      newPassword: "",
    },
  });

  const onSubmit = async ({ otp, newPassword }: ResetPasswordValues) => {
    try {
      await resetPasswordMutation.mutateAsync({ email, otp, newPassword });
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      // handled by mutation toast
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error(t("auth.noEmailToResendOtp"));
      return;
    }

    try {
      await resendOtpMutation.mutateAsync({ email });
      restartCountdown();
    } catch {
      // handled by mutation toast
    }
  };

  return (
    <AuthFormShell
      title={t("auth.resetPasswordTitle")}
      description={t("auth.resetPasswordDescription")}
      footer
    >
      <form
        noValidate
        className={AUTH_FORM_CLASS}
        onSubmit={handleSubmit(onSubmit)}
      >
        <AuthTextField
          label={t("auth.otp")}
          maxLength={5}
          placeholder="12345"
          className={AUTH_OTP_INPUT_CLASS}
          error={errors.otp?.message}
          {...register("otp", { onChange: sanitizeOtpInput })}
        />
        <AuthPasswordField
          label={t("auth.newPassword")}
          autoComplete="new-password"
          placeholder={t("auth.enterNewPassword")}
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />

        {errors.email?.message && (
          <p className={AUTH_ERROR_CLASS}>{errors.email.message}</p>
        )}

        <AuthSubmitButton type="submit" disabled={loading}>
          {loading ? t("auth.resetting") : t("auth.resetPassword")}
        </AuthSubmitButton>

        <AuthResendOtpControl
          countdown={countdown}
          disabled={loading}
          onResend={handleResend}
        />

        <AuthInlineLink href="/login" label={t("auth.login")}>
          {t("auth.rememberedPassword")}
        </AuthInlineLink>
      </form>
    </AuthFormShell>
  );
};

export default VerifyOtpForm;
