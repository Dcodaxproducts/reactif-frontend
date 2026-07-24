"use client";

import { useState } from "react";
import { StartProjectSection as ContactFormSection } from "@/components/pages/Home/ContactFormSection";
import HelpGrid from "@/components/pages/HelpCenter/HelpGrid";
import Hero from "@/components/pages/HelpCenter/Hero";
import { SupportFaqSection } from "@/components/pages/HelpCenter/SupportFaqSection";
import type { SupportFaq } from "@/types/support";

export function HelpCenterContent({
  initialFaqs,
}: {
  initialFaqs: SupportFaq[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handlePopularSelect = (query: string) => {
    setSearchQuery(query);
    window.setTimeout(() => {
      document
        .getElementById("support-faqs")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <>
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPopularSelect={handlePopularSelect}
      />
      <HelpGrid />
      <SupportFaqSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        initialFaqs={initialFaqs}
      />
      <ContactFormSection />
    </>
  );
}
