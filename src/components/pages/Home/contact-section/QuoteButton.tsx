import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { QuoteButtonProps } from "@/types/component-props";

export function QuoteButton({ loading, onRequestQuote }: QuoteButtonProps) {
  const { t } = useAppTranslation();

  return (
    <Button
      asChild
      variant="whiteGlow"
      className="px-5 md:px-6 py-2.5 md:py-3 text-[14px] md:text-[15px] font-sans transition-all duration-300 hover:opacity-90"
    >
      <Link href="/all-vendor-services" onClick={onRequestQuote}>
        {loading ? (
          t("home.contactCta.requesting")
        ) : (
          <>
            {t("home.contactCta.requestQuote")}
            <ArrowRight size={18} />
          </>
        )}
      </Link>
    </Button>
  );
}
