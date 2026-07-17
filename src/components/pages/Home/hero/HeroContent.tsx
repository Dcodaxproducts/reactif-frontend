import { HeroText, HeroTitle } from "@/components/common/HeroUi";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { HeroActions } from "./HeroActions";
import { HeroBadge } from "./HeroBadge";

export function HeroContent() {
  const { t, language } = useAppTranslation();
  const finalTitleLine = t("home.hero.titleLine3");
  const finalWordIndex =
    language === "en" ? finalTitleLine.lastIndexOf(" ") : -1;

  return (
    <div className="relative z-30 space-y-5 text-center md:max-w-[660px] md:text-left lg:w-[min(760px,62vw)] lg:max-w-none lg:self-start lg:pt-0 xl:w-[min(820px,60vw)] xl:pt-1">
      <HeroBadge />

      <HeroTitle className="text-[clamp(2.45rem,4.85vw,5.15rem)] font-black uppercase leading-[1.04] tracking-[-0.055em] drop-shadow-[0_18px_52px_rgba(242,27,109,0.24)] lg:max-xl:text-[2.85rem]">
        <span className="block sm:whitespace-nowrap">
          {t("home.hero.titleLine1")}
        </span>
        <span className="block sm:whitespace-nowrap">
          {t("home.hero.titleLine2")}
        </span>
        <span className="block sm:whitespace-nowrap">
          {finalWordIndex > 0 ? (
            <>
              {finalTitleLine.slice(0, finalWordIndex)}
              <br />
              {finalTitleLine.slice(finalWordIndex + 1)}
            </>
          ) : (
            finalTitleLine
          )}
        </span>
      </HeroTitle>

      <HeroText className="mx-auto max-w-xl text-balance text-white/78 md:mx-0 lg:max-w-[23rem] xl:max-w-[30rem] xl:text-[18px] 2xl:max-w-[32rem]">
        {t("home.hero.description")}
      </HeroText>

      <HeroActions />
    </div>
  );
}
