import { HeroText, HeroTitle } from "@/components/common/HeroUi";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { HeroActions } from "./HeroActions";
import { HeroBadge } from "./HeroBadge";

export function HeroContent() {
  const { t } = useAppTranslation();

  return (
    <div className="space-y-3 pt-0 text-center md:max-w-[680px] md:text-left xl:max-w-[740px] lg:self-start">
      <HeroBadge />

      <HeroTitle className="text-[clamp(2.65rem,6vw,5.75rem)] leading-[0.98] tracking-[-0.04em]">
        <span className="block whitespace-nowrap">
          {t("home.hero.titleLine1")}
        </span>
        <span className="block whitespace-nowrap">
          {t("home.hero.titleLine2")}
        </span>
        <span className="block whitespace-nowrap">
          {t("home.hero.titleLine3")}
        </span>
      </HeroTitle>

      <HeroText className="mx-auto max-w-xl text-balance md:mx-0 xl:max-w-2xl xl:text-[18px]">
        {t("home.hero.description")}
      </HeroText>

      <HeroActions />
    </div>
  );
}
