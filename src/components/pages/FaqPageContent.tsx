"use client";

import { useState } from "react";
import { Container } from "@/components/common/Container";
import { PageShell } from "@/components/common/PageShell";
import { StaticFaqHero } from "@/components/pages/StaticFaqHero";
import { SupportFaqSection } from "@/components/pages/HelpCenter/SupportFaqSection";

export function FaqPageContent() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <PageShell>
      <Container
        gutter="page"
        width="7xl"
        className="pt-14 pb-10 md:pt-24 md:pb-14"
      >
        <StaticFaqHero />
      </Container>
      <div className="pb-12 md:pb-20">
        <SupportFaqSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showControls
        />
      </div>
    </PageShell>
  );
}
