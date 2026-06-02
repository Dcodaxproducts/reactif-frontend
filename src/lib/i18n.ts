import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  messagesByLocale,
} from "../locales";
import type { AppMessages } from "../locales";
import type { LanguageCode } from "../types/settings";

export const isSupportedLanguage = (
  value: unknown,
): value is LanguageCode => {
  return (
    typeof value === "string" &&
    SUPPORTED_LANGUAGES.includes(value as LanguageCode)
  );
};

export const normalizeLanguage = (value: unknown): LanguageCode => {
  return isSupportedLanguage(value) ? value : DEFAULT_LANGUAGE;
};

export const getMessagesForLanguage = (language: unknown): AppMessages => {
  return messagesByLocale[normalizeLanguage(language)];
};
