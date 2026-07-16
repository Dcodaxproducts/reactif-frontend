"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { normalizeLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { LanguageCode } from "@/types/settings";

const compactLabels = {
  en: "EN",
  fr: "FR",
} satisfies Record<LanguageCode, string>;

type LanguageSelectorProps = {
  tone?: "dark" | "light";
};

export function LanguageSelector({ tone = "dark" }: LanguageSelectorProps) {
  const { t, language, setLanguage, languageOptions } = useAppTranslation();

  return (
    <Select
      value={language}
      onValueChange={(value) => setLanguage(normalizeLanguage(value))}
    >
      <SelectTrigger
        aria-label={t("nav.language")}
        className={cn(
          "h-9 w-[76px] rounded-full bg-transparent px-3 text-xs font-semibold",
          tone === "dark"
            ? "border-white/30 text-white"
            : "border-black/20 text-black",
        )}
      >
        <span>{compactLabels[language]}</span>
      </SelectTrigger>
      <SelectContent
        align="end"
        className="z-[1300] min-w-[9rem]"
        position="popper"
        sideOffset={6}
      >
        {languageOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.value === "en"
              ? t("nav.languageEnglish")
              : t("nav.languageFrench")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
