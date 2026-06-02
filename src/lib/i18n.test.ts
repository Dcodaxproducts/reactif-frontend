import { describe, expect, it } from "vitest";

import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  messagesByLocale,
} from "../locales";
import {
  getMessagesForLanguage,
  isSupportedLanguage,
  normalizeLanguage,
} from "./i18n";

describe("i18n helpers", () => {
  it("keeps valid languages valid", () => {
    expect(isSupportedLanguage("en")).toBe(true);
    expect(normalizeLanguage("fr")).toBe("fr");
  });

  it("normalizes invalid languages to English", () => {
    expect(isSupportedLanguage("es")).toBe(false);
    expect(normalizeLanguage("es")).toBe(DEFAULT_LANGUAGE);
  });

  it("loads English messages", () => {
    expect(getMessagesForLanguage("en")).toBe(messagesByLocale.en);
    expect(getMessagesForLanguage("en").common.loading).toBe("Loading...");
  });

  it("loads French messages", () => {
    expect(getMessagesForLanguage("fr")).toBe(messagesByLocale.fr);
    expect(getMessagesForLanguage("fr").common.loading).toBe("Chargement...");
  });

  it("returns English messages for missing or invalid languages", () => {
    expect(getMessagesForLanguage(undefined)).toBe(messagesByLocale.en);
    expect(getMessagesForLanguage("de")).toBe(messagesByLocale.en);
  });

  it("supports only English and French", () => {
    expect([...SUPPORTED_LANGUAGES]).toEqual(["en", "fr"]);
  });
});
