import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").email("Invalid email format."),
  password: z.string().min(1, "Password is required.").min(8, "Password must be at least 8 characters."),
});

export const registrationSchema = z
  .object({
    fullName: z.string().trim().min(1, "Full Name is required."),
    username: z.string().optional(),
    phone: z.string().trim().min(1, "Phone number is required."),
    email: z.string().trim().min(1, "Email is required.").email("Invalid email format."),
    password: z.string().min(1, "Password is required.").min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const getValidationMessage = (error: unknown) => {
  const result = z.string().safeParse(error);
  return result.success ? result.data : "Validation failed.";
};
