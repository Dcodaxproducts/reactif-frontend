import CatalogCard from "@/components/cards/CatalogCard";
import type { CatalogScrollerProps } from "@/types/component-props";

export default function CatalogScroller({ items }: CatalogScrollerProps) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.08)_transparent] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
      {items.map((item) => (
        <div
          key={item.title}
          className="shrink-0 w-[280px] sm:w-[300px] snap-start"
        >
          <CatalogCard item={item} />
        </div>
      ))}
    </div>
  );
}
