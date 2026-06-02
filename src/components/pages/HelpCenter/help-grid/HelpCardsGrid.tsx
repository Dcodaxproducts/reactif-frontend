import { helpCards } from "@/data/help-center";
import { HelpCard } from "./HelpCard";

export function HelpCardsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
      {helpCards.map((card) => (
        <HelpCard key={card.titleKey ?? card.title} card={card} />
      ))}
    </div>
  );
}
