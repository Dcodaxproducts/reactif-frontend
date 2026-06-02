"use client";

import { HeroTitle, HeroText, PrimaryButton } from "@/components/common/HeroUi";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export default function Hero() {
  const { t } = useAppTranslation();

  return (
    <section className="w-full flex justify-center px-4 py-16 md:py-24">
      <div className="max-w-5xl w-full flex flex-col items-center text-center gap-6">
        <HeroTitle className="uppercase max-w-[100%]">
          {t("about.heroTitleLine1")} <br />
          {t("about.heroTitleLine2")}
        </HeroTitle>
        <HeroText className="max-w-2xl text-neutral-100 text-base md:text-lg font-medium capitalize">
          {t("about.heroDescription")}
        </HeroText>
        <div className="pt-4">
          <PrimaryButton
            href="/portfolio"
            className="px-8 py-3 text-sm md:text-base font-bold tracking-wide"
            showIcon={false}
          >
            {t("about.exploreOurWork")}
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
