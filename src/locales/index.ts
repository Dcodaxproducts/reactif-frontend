import en from "./en.json";
import fr from "./fr.json";
import type { LanguageCode } from "../types/settings";

export const DEFAULT_LANGUAGE = "en" satisfies LanguageCode;

export const SUPPORTED_LANGUAGES = [
  "en",
  "fr",
] as const satisfies readonly LanguageCode[];

export const languageOptions: Array<{ label: string; value: LanguageCode }> = [
  { label: "English", value: "en" },
  { label: "Français", value: "fr" },
];

export type AppMessages = typeof en;

export const messagesByLocale = {
  en,
  fr,
} satisfies Record<LanguageCode, AppMessages>;
