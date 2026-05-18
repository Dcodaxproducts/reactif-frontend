import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Invalid email format.");

export const passwordSchema = z
  .string()
  .min(1, "Password is required.")
  .min(8, "Password must be at least 8 characters.");

export const otpSchema = z.object({
  otp: z
    .string()
    .trim()
    .min(1, "Please enter the OTP.")
    .regex(/^\d{5}$/, "OTP must be exactly 5 digits."),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  email: emailSchema,
  otp: otpSchema.shape.otp,
  newPassword: z
    .string()
    .trim()
    .min(1, "New password is required.")
    .min(8, "Password must be at least 8 characters."),
});

export const registrationSchema = z
  .object({
    fullName: z.string().trim().min(1, "Full Name is required."),
    username: z.string().optional(),
    phone: z.string().trim().min(1, "Phone number is required."),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
export type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const getValidationMessage = (error: unknown) => {
  const result = z.string().safeParse(error);
  return result.success ? result.data : "Validation failed.";
};

export const getSchemaValidationMessage = <T>(
  schema: z.ZodType<T>,
  values: unknown,
) => {
  const result = schema.safeParse(values);
  return result.success
    ? null
    : (result.error.errors[0]?.message ?? "Validation failed.");
};
