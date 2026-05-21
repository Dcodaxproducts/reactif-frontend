import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Full name is required."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Invalid email format."),
  phone: z.string().trim().min(1, "Phone number is required."),
  bio: z.string(),
  address: z.string().trim().min(1, "Address is required."),
  avatarFile: z.custom<File | null>().nullable(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
