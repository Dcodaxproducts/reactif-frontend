import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export type CatalogPriceSort = "none" | "asc" | "desc";

type FiltersButtonProps = {
  priceSort: CatalogPriceSort;
  onChangePriceSort: (sort: CatalogPriceSort) => void;
};

const getNextSort = (sort: CatalogPriceSort): CatalogPriceSort => {
  if (sort === "none") return "asc";
  if (sort === "asc") return "desc";
  return "none";
};

export default function FiltersButton({
  priceSort,
  onChangePriceSort,
}: FiltersButtonProps) {
  const { t } = useAppTranslation();
  const label =
    priceSort === "asc"
      ? t("catalog.filters.priceLowHigh")
      : priceSort === "desc"
        ? t("catalog.filters.priceHighLow")
        : t("catalog.filters.priceFilter");

  return (
    <Button
      type="button"
      variant="darkPill"
      onClick={() => onChangePriceSort(getNextSort(priceSort))}
      className="flex items-center gap-2 px-4 py-2 transition text-sm h-auto"
      aria-label={t("catalog.filters.priceFilter")}
    >
      <SlidersHorizontal size={16} />
      {label}
    </Button>
  );
}
