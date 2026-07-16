"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { StatusCard } from "@/components/common/StatusCard";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useSupportFaqs } from "@/hooks/useSupportFaqs";
import { FAQAccordion } from "./faqs/FAQAccordion";
import { FAQHeader } from "./faqs/FAQHeader";
import { HelpSearch } from "./hero/HelpSearch";
import { PopularHelpLinks } from "./hero/PopularHelpLinks";

type SupportFaqSectionProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showControls?: boolean;
};

const normalizeSearchValue = (value: string) => value.trim().toLowerCase();

export function SupportFaqSection({
  searchQuery,
  onSearchChange,
  showControls = false,
}: SupportFaqSectionProps) {
  const { t } = useAppTranslation();
  const { faqs, loading, isFallback } = useSupportFaqs();
  const normalizedQuery = normalizeSearchValue(searchQuery);

  const filteredFaqs = useMemo(() => {
    if (!normalizedQuery) {
      return faqs;
    }

    return faqs.filter((faq) => {
      const searchableText = `${faq.question} ${faq.answer}`.toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [faqs, normalizedQuery]);

  const handlePopularSelect = (query: string) => {
    onSearchChange(query);
  };

  return (
    <section
      id="support-faqs"
      className="w-full px-6 flex justify-center pb-5 scroll-mt-28"
    >
      <div className="max-w-4xl w-full">
        <FAQHeader />

        {showControls && (
          <div className="mb-8 flex flex-col items-center gap-5">
            <HelpSearch value={searchQuery} onChange={onSearchChange} />
            <PopularHelpLinks onSelect={handlePopularSelect} />
          </div>
        )}

        {loading ? (
          <StatusCard
            tone="loading"
            title={t("helpCenter.faq.loadingTitle")}
            description={t("helpCenter.faq.loadingDescription")}
            className="p-6"
          />
        ) : faqs.length === 0 ? (
          <StatusCard
            tone="empty"
            label={t("common.noDataFound")}
            title={t("helpCenter.faq.emptyTitle")}
            description={t("helpCenter.faq.emptyDescription")}
            className="p-6"
          />
        ) : filteredFaqs.length === 0 ? (
          <StatusCard
            tone="empty"
            label={t("common.noDataFound")}
            title={t("helpCenter.faq.noResultsTitle")}
            description={t("helpCenter.faq.noResultsDescription")}
            action={
              <Button
                type="button"
                onClick={() => onSearchChange("")}
                className="h-10 rounded-full bg-white px-5 text-zinc-900 hover:bg-white/90"
              >
                {t("helpCenter.faq.clearSearch")}
              </Button>
            }
            className="p-6"
          />
        ) : (
          <>
            {isFallback ? (
              <p className="mb-4 rounded-2xl border border-amber-200/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
                {t("helpCenter.faq.fallbackNotice")}
              </p>
            ) : null}
            <FAQAccordion faqs={filteredFaqs} />
          </>
        )}
      </div>
    </section>
  );
}
