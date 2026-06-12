import FiltersButton, { type CatalogPriceSort } from "./FiltersButton";
import ProductSearchInput from "./ProductSearchInput";

type ProductFilterBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  priceSort: CatalogPriceSort;
  onChangePriceSort: (sort: CatalogPriceSort) => void;
};

export function ProductFilterBar({
  search,
  onSearchChange,
  priceSort,
  onChangePriceSort,
}: ProductFilterBarProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-stone-950/90 p-4 backdrop-blur-md lg:flex-row lg:items-center">
        <ProductSearchInput value={search} onChange={onSearchChange} />

        <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end">
          <FiltersButton
            priceSort={priceSort}
            onChangePriceSort={onChangePriceSort}
          />
        </div>
      </div>
    </div>
  );
}
