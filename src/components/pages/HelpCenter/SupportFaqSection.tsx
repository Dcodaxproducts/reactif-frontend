"use client";

import { useMemo, type ReactNode } from "react";
import { AlertCircle, Loader2, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const { faqs, loading, isError, refetch } = useSupportFaqs();
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
          <FaqStatusCard
            icon={<Loader2 className="animate-spin" size={22} />}
            title={t("helpCenter.faq.loadingTitle")}
            description={t("helpCenter.faq.loadingDescription")}
          />
        ) : isError ? (
          <FaqStatusCard
            icon={<AlertCircle size={22} />}
            title={t("helpCenter.faq.errorTitle")}
            description={t("helpCenter.faq.errorDescription")}
            action={
              <Button
                type="button"
                onClick={() => void refetch()}
                className="h-10 rounded-full bg-white px-5 text-zinc-900 hover:bg-white/90"
              >
                {t("common.tryAgain")}
              </Button>
            }
          />
        ) : faqs.length === 0 ? (
          <FaqStatusCard
            icon={<SearchX size={22} />}
            title={t("helpCenter.faq.emptyTitle")}
            description={t("helpCenter.faq.emptyDescription")}
          />
        ) : filteredFaqs.length === 0 ? (
          <FaqStatusCard
            icon={<SearchX size={22} />}
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
          />
        ) : (
          <FAQAccordion faqs={filteredFaqs} />
        )}
      </div>
    </section>
  );
}

function FaqStatusCard({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0f17] p-6 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cyan-300">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
