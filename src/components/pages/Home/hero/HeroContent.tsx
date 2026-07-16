import { HeroText, HeroTitle } from "@/components/common/HeroUi";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { HeroActions } from "./HeroActions";
import { HeroBadge } from "./HeroBadge";

export function HeroContent() {
  const { t } = useAppTranslation();

  return (
    <div className="relative z-30 space-y-5 text-center md:max-w-[660px] md:text-left lg:w-[min(760px,62vw)] lg:max-w-none lg:self-start lg:pt-0 xl:w-[min(820px,60vw)] xl:pt-1">
      <HeroBadge />

      <HeroTitle className="text-[clamp(2.45rem,4.85vw,5.15rem)] font-black uppercase leading-[1.04] tracking-[-0.055em] drop-shadow-[0_18px_52px_rgba(242,27,109,0.24)]">
        <span className="block sm:whitespace-nowrap">
          {t("home.hero.titleLine1")}
        </span>
        <span className="block sm:whitespace-nowrap">
          {t("home.hero.titleLine2")}
        </span>
        <span className="block sm:whitespace-nowrap">
          {t("home.hero.titleLine3")}
        </span>
      </HeroTitle>

      <HeroText className="mx-auto max-w-xl text-balance text-white/78 md:mx-0 xl:max-w-2xl xl:text-[18px]">
        {t("home.hero.description")}
      </HeroText>

      <HeroActions />
    </div>
  );
}
