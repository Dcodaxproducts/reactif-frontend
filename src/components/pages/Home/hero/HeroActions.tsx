import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useQuoteNavigation } from "@/hooks/useQuoteNavigation";
import { PORTFOLIO_ROUTE } from "@/lib/quote-routes";

export function HeroActions() {
  const { t } = useAppTranslation();
  const { loading, openQuoteFlow } = useQuoteNavigation();

  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row sm:gap-6 md:justify-start md:items-start">
      <Button
        type="button"
        variant="brandGlow"
        disabled={loading}
        onClick={openQuoteFlow}
        className="font-sans"
      >
        {t("home.hero.freeQuote")}
        <ArrowRight size={18} />
      </Button>

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
        <Link href={PORTFOLIO_ROUTE}>{t("home.hero.ourProjects")}</Link>
      </Button>
    </div>
  );
}
