import CatalogCard from "@/components/cards/CatalogCard";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { CatalogScrollerProps } from "@/types/component-props";

export default function CatalogScroller({
  services,
  categoryNamesById,
}: CatalogScrollerProps) {
  const { t } = useAppTranslation();

  return (
    <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {services.map((service) => (
        <CatalogCard
          key={service.id}
          service={service}
          categoryName={
            categoryNamesById.get(service.category_id) ??
            t("catalog.uncategorized")
          }
        />
      ))}
    </div>
  );
}
