import { z } from "zod";

export const themeModeSchema = z.enum(["light", "dark", "system"]);
export const languageSchema = z.enum(["en", "fr"]);

export const appSettingsSchema = z.object({
  themeMode: themeModeSchema,
  language: languageSchema,
});

export type AppSettingsFormValues = z.infer<typeof appSettingsSchema>;
