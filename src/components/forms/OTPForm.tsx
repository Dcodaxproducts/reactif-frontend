"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
  AUTH_FORM_CLASS,
  AUTH_OTP_INPUT_CLASS,
  AuthFormShell,
  AuthInlineLink,
  AuthResendOtpControl,
  AuthSubmitButton,
  AuthTextField,
  sanitizeOtpInput,
} from "@/components/forms/AuthFormShell";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useResendAuthCode, useVerifyAuth } from "@/hooks/useAuth";
import { useOtpCountdown } from "@/hooks/useOtpCountdown";
import { createOtpSchema, type OtpFormValues } from "@/validations/auth";

const OTPForm = () => {
  const { t } = useAppTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const { countdown, restartCountdown } = useOtpCountdown();
  const verifyOtpMutation = useVerifyAuth();
  const resendOtpMutation = useResendAuthCode();
  const loading = verifyOtpMutation.isPending || resendOtpMutation.isPending;
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<OtpFormValues>({
    resolver: zodResolver(createOtpSchema((key) => t(key))),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async ({ otp }: OtpFormValues) => {
    if (!navigator.onLine) {
      toast.error(t("auth.noInternetConnection"));
      return;
    }

    try {
      if (!email) {
        throw new Error(t("auth.verificationEmailNotFound"));
      }

      await verifyOtpMutation.mutateAsync({ email, otp });
      toast.success(t("auth.accountVerified"));
      setTimeout(() => router.push("/login"), 1200);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : t("auth.verificationFailed");
      toast.error(message);
    }
  };

  const handleResend = async () => {
    if (!navigator.onLine) {
      toast.error(t("auth.noInternetConnection"));
      return;
    }

    if (!email) {
      toast.error(t("auth.noEmailToResendOtp"));
      return;
    }

    try {
      await resendOtpMutation.mutateAsync({ email });
      restartCountdown();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : t("auth.failedToResendOtp");
      toast.error(message);
    }
  };

  return (
    <AuthFormShell
      title={t("auth.verifyAccountTitle")}
      description={t("auth.verifyAccountDescription")}
    >
      <form
        noValidate
        className={AUTH_FORM_CLASS}
        onSubmit={handleSubmit(onSubmit)}
      >
        <AuthTextField
          label={t("auth.verificationCode")}
          maxLength={5}
          placeholder="12345"
          className={AUTH_OTP_INPUT_CLASS}
          error={errors.otp?.message}
          {...register("otp", { onChange: sanitizeOtpInput })}
        />

        <AuthSubmitButton type="submit" disabled={loading}>
          {loading ? t("auth.verifying") : t("auth.verify")}
        </AuthSubmitButton>

        <AuthResendOtpControl
          countdown={countdown}
          disabled={loading}
          onResend={handleResend}
        />

        <AuthInlineLink href="/login" label={t("auth.login")}>
          {t("auth.backTo")}
        </AuthInlineLink>
      </form>
    </AuthFormShell>
  );
};

export default OTPForm;
