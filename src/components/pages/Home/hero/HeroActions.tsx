import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PrimaryButton } from "@/components/common/HeroUi";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function HeroActions() {
  const { t } = useAppTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row sm:gap-6 md:justify-start md:items-start">
      <PrimaryButton href="/all-vendor-services">
        {t("home.hero.freeQuote")}
      </PrimaryButton>

      <Button
        asChild
        className="font-sans px-6 md:px-8 py-3 rounded-full font-medium flex items-center gap-2 text-white relative hover:bg-transparent"
        style={{
          background:
            "linear-gradient(#000, #000) padding-box, linear-gradient(91.06deg, #4D43ED 0.9%, #9C3CD3 49.1%, #D22877 99.19%) border-box",
          border: "1px solid transparent",
          boxShadow: "inset 0px 4px 24.9px 0px #FFFFFF40",
        }}
      >
        <Link href="/all-vendor-services">{t("home.hero.ourProjects")}</Link>
      </Button>
    </div>
  );
}
