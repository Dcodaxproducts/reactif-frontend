"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Loader2, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/common/PageShell";
import { catalogBackgroundStyle } from "@/data/catalog";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useCategories, useServices } from "@/hooks/useCategories";
import type { Service } from "@/types/categories";
import CatalogSection from "./CatalogSection";
import CatalogHero from "./CatalogHero";
import ProductFilterBar from "./ProductFilterBar";
import type { CatalogPriceSort } from "./FiltersButton";

const buildServiceParams = ({
  activeCategory,
  search,
}: {
  activeCategory: string;
  search: string;
}) => {
  const trimmedSearch = search.trim();

  return {
    limit: 100,
    ...(activeCategory !== "all" ? { category_id: activeCategory } : {}),
    ...(trimmedSearch ? { search: trimmedSearch } : {}),
  };
};

const sortServicesByPrice = (
  services: Service[],
  priceSort: CatalogPriceSort,
) => {
  if (priceSort === "none") {
    return services;
  }

  return [...services].sort((first, second) => {
    const firstPrice = first.price ?? 0;
    const secondPrice = second.price ?? 0;

    return priceSort === "asc"
      ? firstPrice - secondPrice
      : secondPrice - firstPrice;
  });
};

export default function CatalogPage() {
  const { t } = useAppTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState<CatalogPriceSort>("none");

  const { categories, loading: categoriesLoading } = useCategories({
    per_page: 100,
  });
  const serviceParams = useMemo(
    () => buildServiceParams({ activeCategory, search }),
    [activeCategory, search],
  );
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
    refetch,
  } = useServices(serviceParams);

  const categoryNamesById = useMemo(
    () => new Map(categories.map((category) => [category.id, category.name])),
    [categories],
  );
  const visibleServices = useMemo(
    () =>
      sortServicesByPrice(
        services.filter(({ status }) => status !== 0),
        priceSort,
      ),
    [priceSort, services],
  );
  const loading = categoriesLoading || servicesLoading;

  return (
    <PageShell backgroundStyle={catalogBackgroundStyle}>
      <CatalogHero />
      <div className="space-y-10 px-4 pb-20 sm:px-6 md:px-30">
        <ProductFilterBar
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          search={search}
          onSearchChange={setSearch}
          priceSort={priceSort}
          onChangePriceSort={setPriceSort}
        />

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-black/40 p-10 text-center backdrop-blur-xl">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-white" />
            <p className="mt-5 text-sm text-slate-400">
              {t("catalog.loading")}
            </p>
          </div>
        ) : servicesError ? (
          <div className="rounded-3xl border border-red-400/20 bg-red-950/30 p-10 text-center backdrop-blur-xl">
            <AlertCircle className="mx-auto h-10 w-10 text-red-200" />
            <h2 className="mt-5 text-xl font-semibold text-white">
              {t("catalog.errorTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-red-100/75">
              {t("catalog.errorDescription")}
            </p>
            <Button
              type="button"
              onClick={() => refetch()}
              className="mt-6 rounded-full bg-white px-6 py-3 text-zinc-900 hover:bg-white/90"
            >
              {t("catalog.retry")}
            </Button>
          </div>
        ) : visibleServices.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-black/40 p-10 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <PackageSearch className="h-6 w-6 text-pink-200" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">
              {t("catalog.emptyTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
              {t("catalog.emptyDescription")}
            </p>
          </div>
        ) : (
          <CatalogSection
            title={t("catalog.sections.ourServices")}
            services={visibleServices}
            categoryNamesById={categoryNamesById}
          />
        )}
      </div>
    </PageShell>
  );
}
