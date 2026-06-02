import { HeroTitle } from "@/components/common/HeroUi";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function HelpHeroTitle() {
  const { t } = useAppTranslation();

  return (
    <HeroTitle className="uppercase leading-tight">
      <span className="text-white">{t("helpCenter.hero.titlePrefix")} </span>
      <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        {t("helpCenter.hero.titleAccent")}
      </span>
    </HeroTitle>
  );
}
