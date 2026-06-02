import { z } from "zod";

type ValidationTranslator = (key: string) => string;

const englishValidationTranslator: ValidationTranslator = (key) => {
  const messages: Record<string, string> = {
    "validation.emailRequired": "Email is required.",
    "validation.invalidEmail": "Invalid email format.",
    "validation.passwordRequired": "Password is required.",
    "validation.passwordMin": "Password must be at least 8 characters.",
    "validation.otpRequired": "Please enter the OTP.",
    "validation.otpExactLength": "OTP must be exactly 5 digits.",
    "validation.newPasswordRequired": "New password is required.",
    "validation.fullNameRequired": "Full Name is required.",
    "validation.phoneRequired": "Phone number is required.",
    "validation.confirmPasswordRequired": "Confirm password is required.",
    "validation.passwordsDoNotMatch": "Passwords do not match.",
  };

  return messages[key] ?? key;
};

const createEmailSchema = (t: ValidationTranslator) =>
  z
    .string()
    .trim()
    .min(1, t("validation.emailRequired"))
    .email(t("validation.invalidEmail"));

const createPasswordSchema = (t: ValidationTranslator) =>
  z
    .string()
    .min(1, t("validation.passwordRequired"))
    .min(8, t("validation.passwordMin"));

export const createOtpSchema = (t: ValidationTranslator) =>
  z.object({
    otp: z
      .string()
      .trim()
      .min(1, t("validation.otpRequired"))
      .regex(/^\d{5}$/, t("validation.otpExactLength")),
  });

export const createLoginSchema = (t: ValidationTranslator) =>
  z.object({
    email: createEmailSchema(t),
    password: createPasswordSchema(t),
  });

export const createForgotPasswordSchema = (t: ValidationTranslator) =>
  z.object({
    email: createEmailSchema(t),
  });

export const createResetPasswordSchema = (t: ValidationTranslator) =>
  z.object({
    email: createEmailSchema(t),
    otp: createOtpSchema(t).shape.otp,
    newPassword: z
      .string()
      .trim()
      .min(1, t("validation.newPasswordRequired"))
      .min(8, t("validation.passwordMin")),
  });

export const createRegisterSchema = (t: ValidationTranslator) =>
  z
    .object({
      fullName: z.string().trim().min(1, t("validation.fullNameRequired")),
      username: z.string().optional(),
      phone: z.string().trim().min(1, t("validation.phoneRequired")),
      email: createEmailSchema(t),
      password: createPasswordSchema(t),
      confirmPassword: z.string().min(1, t("validation.confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

export const emailSchema = createEmailSchema(englishValidationTranslator);
export const passwordSchema = createPasswordSchema(englishValidationTranslator);
export const otpSchema = createOtpSchema(englishValidationTranslator);
export const loginSchema = createLoginSchema(englishValidationTranslator);
export const forgotPasswordSchema = createForgotPasswordSchema(
  englishValidationTranslator,
);
export const resetPasswordSchema = createResetPasswordSchema(
  englishValidationTranslator,
);
export const registrationSchema = createRegisterSchema(
  englishValidationTranslator,
);

export type LoginFormValues = z.infer<typeof loginSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type ResetPasswordValues = ResetPasswordFormValues;
export type OtpFormValues = z.infer<typeof otpSchema>;
export type RegistrationFormValues = z.infer<typeof registrationSchema>;
