import { z } from "zod";

type TranslationResolver = (key: string) => string;

const defaultValidationMessages: Record<string, string> = {
  "validation.fullNameRequired": "Full name is required.",
  "validation.emailRequired": "Email is required.",
  "validation.invalidEmail": "Invalid email format.",
  "validation.phoneRequired": "Phone number is required.",
  "validation.addressRequired": "Address is required.",
};

const resolveValidationMessage =
  (translate?: TranslationResolver) => (key: string) =>
    translate ? translate(key) : defaultValidationMessages[key];

export const createProfileSchema = (translate?: TranslationResolver) => {
  const message = resolveValidationMessage(translate);

  return z.object({
    name: z.string().trim().min(1, message("validation.fullNameRequired")),
    email: z
      .string()
      .trim()
      .min(1, message("validation.emailRequired"))
      .email(message("validation.invalidEmail")),
    phone: z.string().trim().min(1, message("validation.phoneRequired")),
    bio: z.string(),
    address: z.string().trim().min(1, message("validation.addressRequired")),
    avatarFile: z.custom<File | null>().nullable(),
  });
};

export const profileSchema = createProfileSchema();

export type ProfileFormValues = z.infer<typeof profileSchema>;
