"use client";

import { useId, useState, type ChangeEvent, type ReactNode } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { PageShell } from "@/components/common/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { cn } from "@/lib/utils";

const AUTH_SECTION_CLASS =
  "w-full min-h-screen flex items-center justify-center px-4 py-10";
const AUTH_CARD_CLASS =
  "w-full max-w-xl rounded-3xl border border-indigo-600 backdrop-blur-sm bg-black/10 p-6 sm:p-8 md:p-14 md:py-17 flex flex-col gap-8";
const AUTH_TITLE_CLASS =
  "bg-gradient-to-r from-[#F262B5] to-[#9F73F1] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl font-bold font-hk uppercase";
const AUTH_DESCRIPTION_CLASS =
  "text-neutral-50/60 text-sm sm:text-base font-semibold font-hk";
export const AUTH_FORM_CLASS = "space-y-6";
export const AUTH_FORM_GRID_CLASS = "grid grid-cols-1 md:grid-cols-2 gap-6";
export const AUTH_INPUT_CLASS =
  "bg-transparent border-neutral-50/30 text-white focus-visible:border-cyan-200/70 focus-visible:ring-cyan-200/20";
export const AUTH_LINK_TEXT_CLASS =
  "text-center text-sm sm:text-base font-semibold text-neutral-50/60";
export const AUTH_ERROR_CLASS = "text-red-500 text-sm font-medium";
export const AUTH_SUCCESS_CLASS = "text-green-500 text-sm font-medium";
export const AUTH_RESEND_ROW_CLASS = "text-center text-sm text-neutral-50/60";
export const AUTH_RESEND_BUTTON_CLASS = "text-blue-600 font-semibold";
export const AUTH_OTP_INPUT_CLASS = "text-center tracking-widest text-lg";
export const sanitizeOtpInput = (event: ChangeEvent<HTMLInputElement>) => {
  event.target.value = event.target.value.replace(/\D/g, "");
};

export function AuthPageShell({ children }: { children: ReactNode }) {
  return <PageShell>{children}</PageShell>;
}

type AuthFormShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer?: boolean;
  descriptionClassName?: string;
};

export function AuthFormShell({
  title,
  description,
  children,
  footer = false,
  descriptionClassName,
}: AuthFormShellProps) {
  const { t } = useAppTranslation();

  return (
    <section className={AUTH_SECTION_CLASS}>
      <div className={AUTH_CARD_CLASS}>
        <div className="text-center space-y-2">
          <h1 className={AUTH_TITLE_CLASS}>{title}</h1>
          <p className={cn(AUTH_DESCRIPTION_CLASS, descriptionClassName)}>
            {description}
          </p>
        </div>
        {children}
        {footer && (
          <div className="text-center text-neutral-50/60 text-xs sm:text-sm">
            {t("auth.footerCopyright")}
          </div>
        )}
      </div>
    </section>
  );
}

type AuthTextFieldProps = {
  label: string;
  error?: string;
  endAdornment?: ReactNode;
} & React.ComponentProps<typeof Input>;

export function AuthTextField({
  label,
  className,
  error,
  endAdornment,
  id,
  ...props
}: AuthTextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId} className="text-neutral-50 font-semibold">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={inputId}
          aria-invalid={Boolean(error)}
          className={cn(AUTH_INPUT_CLASS, endAdornment && "pr-12", className)}
          {...props}
        />
        {endAdornment && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            {endAdornment}
          </div>
        )}
      </div>
      {error && <p className={AUTH_ERROR_CLASS}>{error}</p>}
    </div>
  );
}

export function AuthPasswordField(props: AuthTextFieldProps) {
  const { t } = useAppTranslation();
  const [visible, setVisible] = useState(false);
  const Icon = visible ? EyeOff : Eye;

  return (
    <AuthTextField
      {...props}
      type={visible ? "text" : "password"}
      className={cn("pr-12", props.className)}
      endAdornment={
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={visible ? t("auth.hidePassword") : t("auth.showPassword")}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
          className="h-9 w-9 rounded-full text-neutral-50/60 hover:bg-white/10 hover:text-neutral-50"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </Button>
      }
    />
  );
}

type AuthSubmitButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ComponentProps<typeof Button>;

export function AuthSubmitButton({
  children,
  className,
  ...props
}: AuthSubmitButtonProps) {
  return (
    <Button variant="authGradient" className={className} {...props}>
      {children}
    </Button>
  );
}

type AuthInlineLinkProps = {
  children: ReactNode;
  href: string;
  label: string;
};

export function AuthInlineLink({ children, href, label }: AuthInlineLinkProps) {
  return (
    <p className={AUTH_LINK_TEXT_CLASS}>
      {children}{" "}
      <Link href={href} className="text-blue-600">
        {label}
      </Link>
    </p>
  );
}

type AuthResendOtpControlProps = {
  countdown: number;
  disabled?: boolean;
  onResend: () => void;
};

export function AuthResendOtpControl({
  countdown,
  disabled = false,
  onResend,
}: AuthResendOtpControlProps) {
  const { t } = useAppTranslation();

  return (
    <div className={AUTH_RESEND_ROW_CLASS}>
      {countdown <= 0 ? (
        <Button
          type="button"
          variant="link"
          onClick={onResend}
          disabled={disabled}
          className={AUTH_RESEND_BUTTON_CLASS}
        >
          {t("auth.resendOtp")}
        </Button>
      ) : (
        <span>{t("auth.resendOtpIn", { seconds: countdown })}</span>
      )}
    </div>
  );
}
