import { Card, CardContent } from "@/components/ui/card";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { QuoteButton } from "./QuoteButton";
import type { QuoteButtonProps } from "@/types/component-props";

export function ContactCtaCard({ loading, onRequestQuote }: QuoteButtonProps) {
  const { t } = useAppTranslation();

  return (
    <Card className="rounded-[12px] border border-[#F5F5F580] bg-transparent py-0 shadow-none">
      <CardContent className="py-12 md:py-20 px-6 sm:px-10 md:px-16 text-center">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 md:mb-6"
          style={{
            background:
              "linear-gradient(90deg, #FF6EC7 0%, #9F73F1 50%, #5FC5FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("home.contactCta.title")}
        </h2>

        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-8 md:mb-10 font-hk">
          {t("home.contactCta.description")}
        </p>

        <div className="flex justify-center">
          <QuoteButton loading={loading} onRequestQuote={onRequestQuote} />
        </div>
      </CardContent>
    </Card>
  );
}
