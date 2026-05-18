import { catalogFilterCategories } from "@/data/catalog";
import CatalogCategoryButton from "./CatalogCategoryButton";

type CatalogCategoryFiltersProps = {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
};

export default function CatalogCategoryFilters({
  activeCategory,
  onSelectCategory,
}: CatalogCategoryFiltersProps) {
  return (
    <>
      {catalogFilterCategories.map((category) => (
        <CatalogCategoryButton
          key={category}
          category={category}
          active={activeCategory === category}
          onSelect={onSelectCategory}
        />
      ))}
    </>
  );
}
