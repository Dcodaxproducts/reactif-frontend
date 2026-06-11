import { useAppTranslation } from "@/hooks/useAppTranslation";
import CatalogCategoryButton from "./CatalogCategoryButton";
import type { Category } from "@/types/categories";

type CatalogCategoryFiltersProps = {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  categories: Category[];
};

export default function CatalogCategoryFilters({
  activeCategory,
  onSelectCategory,
  categories,
}: CatalogCategoryFiltersProps) {
  const { t } = useAppTranslation();

  return (
    <>
      <CatalogCategoryButton
        category="all"
        label={t("catalog.filters.allProducts")}
        active={activeCategory === "all"}
        onSelect={onSelectCategory}
      />
      {categories.map((category) => (
        <CatalogCategoryButton
          key={category.id}
          category={String(category.id)}
          label={category.name}
          active={activeCategory === String(category.id)}
          onSelect={onSelectCategory}
        />
      ))}
    </>
  );
}
