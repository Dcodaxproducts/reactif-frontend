import { catalogFilterCategories } from "@/data/catalog";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import CatalogCategoryButton from "./CatalogCategoryButton";

type CatalogCategoryFiltersProps = {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
};

export default function CatalogCategoryFilters({
  activeCategory,
  onSelectCategory,
}: CatalogCategoryFiltersProps) {
  const { t } = useAppTranslation();

  return (
    <>
      {catalogFilterCategories.map((category) => (
        <CatalogCategoryButton
          key={category.value}
          category={category.value}
          label={t(category.labelKey)}
          active={activeCategory === category.value}
          onSelect={onSelectCategory}
        />
      ))}
    </>
  );
}
