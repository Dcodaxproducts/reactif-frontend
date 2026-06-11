import type { CatalogSectionProps } from "@/types/component-props";
import CatalogScroller from "./CatalogScroller";

export default function CatalogSection({
  title,
  services,
  categoryNamesById,
}: CatalogSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-white text-2xl md:text-3xl font-bold">{title}</h2>
      <CatalogScroller
        services={services}
        categoryNamesById={categoryNamesById}
      />
    </div>
  );
}
