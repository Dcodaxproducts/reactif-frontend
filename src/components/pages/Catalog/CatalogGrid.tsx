"use client";

import { useCatalog } from "@/hooks/useCatalog";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import CatalogSection from "./CatalogSection";

export default function CatalogGrid() {
  const { t } = useAppTranslation();
  const { items } = useCatalog();

  return (
    <div className="space-y-6">
      <CatalogSection title={t("catalog.sections.ourServices")} items={items} />
      <CatalogSection
        title={t("catalog.sections.popularServices")}
        items={items.slice(2)}
      />
    </div>
  );
}
