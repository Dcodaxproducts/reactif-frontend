import en from "./en.json";
import fr from "./fr.json";
import type { LanguageCode } from "../types/settings";

export const DEFAULT_LANGUAGE = "fr" satisfies LanguageCode;

export const SUPPORTED_LANGUAGES: readonly LanguageCode[] = ["fr", "en"];

export const languageOptions: Array<{ label: string; value: LanguageCode }> = [
  { label: "Français", value: "fr" },
  { label: "English", value: "en" },
];

export type AppMessages = typeof en;

export const messagesByLocale = {
  en,
  fr,
} satisfies Record<LanguageCode, AppMessages>;
