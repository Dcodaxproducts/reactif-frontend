"use client";

import { PrimaryButton } from "@/components/common/HeroUi";
import { useAppTranslation } from "@/hooks/useAppTranslation";

interface LegalCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

function LegalCTA({
  title,
  description,
  buttonText,
}: LegalCTAProps) {
  const { t } = useAppTranslation();

  return (
    <div className="mt-15 p-6 md:p-8 rounded-2xl border border-pink-400/20 bg-pink-400/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="space-y-1">
        <h4 className="text-white text-lg md:text-xl font-bold">
          {title ?? t("legal.cta.title")}
        </h4>

        <p className="text-slate-400 text-sm md:text-base">
          {description ?? t("legal.cta.description")}
        </p>
      </div>

      <PrimaryButton href="/contact" className="px-6 py-3 text-sm md:text-base">
        {buttonText ?? t("legal.cta.button")}
      </PrimaryButton>
    </div>
  );
}

export default LegalCTA;
