"use client";

import { HelpHeroTitle } from "./hero/HelpHeroTitle";
import { HelpSearch } from "./hero/HelpSearch";
import { PopularHelpLinks } from "./hero/PopularHelpLinks";
import { SupportBadge } from "./hero/SupportBadge";

type HeroProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPopularSelect: (query: string) => void;
};

export default function Hero({
  searchQuery,
  onSearchChange,
  onPopularSelect,
}: HeroProps) {
  return (
    <section className="relative w-full flex justify-center px-4 pt-20 md:pt-28 overflow-hidden pb-10">
      <div className="max-w-4xl w-full flex flex-col items-center text-center gap-8 z-10">
        <SupportBadge />
        <HelpHeroTitle />
        <HelpSearch value={searchQuery} onChange={onSearchChange} />
        <PopularHelpLinks onSelect={onPopularSelect} />
      </div>
    </section>
  );
}
