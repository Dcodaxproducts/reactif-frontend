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
  it("keeps French as the default while supporting English", () => {
    expect(isSupportedLanguage("fr")).toBe(true);
    expect(isSupportedLanguage("en")).toBe(true);
    expect(normalizeLanguage("fr")).toBe("fr");
    expect(normalizeLanguage("en")).toBe("en");
  });

  it("normalizes invalid languages to the default French locale", () => {
    expect(isSupportedLanguage("es")).toBe(false);
    expect(normalizeLanguage("es")).toBe(DEFAULT_LANGUAGE);
  });

  it("loads French and English messages", () => {
    expect(getMessagesForLanguage("fr")).toBe(messagesByLocale.fr);
    expect(getMessagesForLanguage("fr").common.loading).toBe("Chargement...");
    expect(getMessagesForLanguage("en")).toBe(messagesByLocale.en);
    expect(getMessagesForLanguage("en").common.loading).toBe("Loading...");
  });

  it("returns French messages for missing or invalid languages", () => {
    expect(getMessagesForLanguage(undefined)).toBe(messagesByLocale.fr);
    expect(getMessagesForLanguage("de")).toBe(messagesByLocale.fr);
  });

  it("offers French first and English second on the customer site", () => {
    expect([...SUPPORTED_LANGUAGES]).toEqual(["fr", "en"]);
    expect(DEFAULT_LANGUAGE).toBe("fr");
  });
});
