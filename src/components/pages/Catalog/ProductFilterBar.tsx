"use client";

import { useState } from "react";
import { catalogFilterCategories } from "@/data/catalog";
import CatalogCategoryFilters from "./CatalogCategoryFilters";
import FiltersButton from "./FiltersButton";
import ProductSearchInput from "./ProductSearchInput";

export default function ProductFilterBar() {
  const [activeCategory, setActiveCategory] = useState(
    catalogFilterCategories[0].value,
  );

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row items-center gap-4 p-4 rounded-xl border border-white/10 bg-stone-950/90 backdrop-blur-md">
        <ProductSearchInput />

        <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-end">
          <CatalogCategoryFilters
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
          <FiltersButton />
        </div>
      </div>
    </div>
  );
}
