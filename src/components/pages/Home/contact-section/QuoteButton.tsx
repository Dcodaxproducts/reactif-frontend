import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useQuoteNavigation } from "@/hooks/useQuoteNavigation";
import type { QuoteButtonProps } from "@/types/component-props";

export function QuoteButton({ loading, onRequestQuote }: QuoteButtonProps) {
  const { t } = useAppTranslation();
  const { loading: authLoading, openQuoteFlow } = useQuoteNavigation();
  const isLoading = loading || authLoading;

  const handleClick = () => {
    onRequestQuote();
    openQuoteFlow();
  };

  return (
    <Button
      type="button"
      variant="whiteGlow"
      disabled={isLoading}
      onClick={handleClick}
      className="px-5 md:px-6 py-2.5 md:py-3 text-[14px] md:text-[15px] font-sans transition-all duration-300 hover:opacity-90"
    >
      {isLoading ? (
        t("home.contactCta.requesting")
      ) : (
        <>
          {t("home.contactCta.requestQuote")}
          <ArrowRight size={18} />
        </>
      )}
    </Button>
  );
}
