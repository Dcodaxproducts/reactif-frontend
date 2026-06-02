"use client";

import { useTranslations } from "next-intl";
import { useLanguageContext } from "@/components/providers/language-provider";
import { languageOptions } from "@/locales";

export const useAppTranslation = () => {
  const t = useTranslations();
  const { language, setLanguage } = useLanguageContext();

  return {
    t,
    language,
    setLanguage,
    languageOptions,
  };
};
