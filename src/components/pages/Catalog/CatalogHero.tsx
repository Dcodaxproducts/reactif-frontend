"use client";

import { HeroText, HeroTitle } from "@/components/common/HeroUi";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export default function CatalogHero() {
  const { t } = useAppTranslation();

  return (
    <section className="w-full flex justify-center px-4 py-16 md:py-24">
      <div className="max-w-5xl w-full flex flex-col items-center text-center gap-6">
        <HeroTitle className="uppercase max-w-[100%]">
          {t("catalog.hero.title")}
        </HeroTitle>

        <HeroText className="max-w-2xl text-neutral-100 text-base md:text-lg font-medium capitalize">
          {t("catalog.hero.description")}
        </HeroText>
      </div>
    </section>
  );
}
