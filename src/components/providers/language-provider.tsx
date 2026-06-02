"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { NextIntlClientProvider } from "next-intl";
import {
  APP_SETTINGS_CHANGE_EVENT,
  readAppSettings,
  writeAppSettings,
} from "@/lib/app-settings";
import { getMessagesForLanguage, normalizeLanguage } from "@/lib/i18n";
import { DEFAULT_LANGUAGE } from "@/locales";
import type { LanguageCode } from "@/types/settings";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const setDocumentLanguage = (language: LanguageCode) => {
  document.documentElement.lang = language;
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] =
    useState<LanguageCode>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const storedSettings = readAppSettings();
    const storedLanguage = normalizeLanguage(storedSettings.language);

    setLanguageState(storedLanguage);
    setDocumentLanguage(storedLanguage);

    const handleSettingsChange = (event: Event) => {
      const nextSettings =
        event instanceof CustomEvent ? event.detail : readAppSettings();
      const nextLanguage = normalizeLanguage(nextSettings.language);

      setLanguageState(nextLanguage);
      setDocumentLanguage(nextLanguage);
    };

    window.addEventListener(APP_SETTINGS_CHANGE_EVENT, handleSettingsChange);
    return () =>
      window.removeEventListener(
        APP_SETTINGS_CHANGE_EVENT,
        handleSettingsChange,
      );
  }, []);

  const setLanguage = (nextLanguage: LanguageCode) => {
    const normalizedLanguage = normalizeLanguage(nextLanguage);
    const currentSettings = readAppSettings();

    writeAppSettings({
      ...currentSettings,
      themeMode: currentSettings.themeMode,
      language: normalizedLanguage,
    });
    setDocumentLanguage(normalizedLanguage);
    setLanguageState(normalizedLanguage);
  };

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      <NextIntlClientProvider
        locale={language}
        messages={getMessagesForLanguage(language)}
        timeZone="UTC"
      >
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguageContext must be used within LanguageProvider");
  }

  return context;
};
