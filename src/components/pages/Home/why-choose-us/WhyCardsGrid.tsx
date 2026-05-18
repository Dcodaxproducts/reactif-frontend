import { whyChooseUsData } from "@/data/home";
import { WhyCard } from "./WhyCard";

export function WhyCardsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
      {whyChooseUsData.map((item, index) => (
        <WhyCard key={`${item.title}-${index}`} {...item} index={index} />
      ))}
    </div>
  );
}
