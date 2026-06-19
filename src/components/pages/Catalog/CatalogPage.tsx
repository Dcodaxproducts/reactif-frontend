"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, PackageSearch } from "lucide-react";
import { StatusCard } from "@/components/common/StatusCard";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/common/PageShell";
import { catalogBackgroundStyle } from "@/data/catalog";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useCategories, useServices } from "@/hooks/useCategories";
import {
  filterCatalogCategories,
  filterCatalogServices,
} from "@/lib/catalog-search";
import type { Service } from "@/types/categories";
import CatalogSection from "./CatalogSection";
import CatalogHero from "./CatalogHero";
import { ProductFilterBar } from "./ProductFilterBar";
import type { CatalogPriceSort } from "./FiltersButton";
import { CatalogCategoryExplorer } from "./CatalogCategoryExplorer";

const buildServiceParams = () => {
  return {
    per_page: 100,
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

export function CatalogPage() {
  const { t } = useAppTranslation();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [priceSort, setPriceSort] = useState<CatalogPriceSort>("none");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [search]);

  const { categories, loading: categoriesLoading } = useCategories({
    per_page: 100,
  });
  const serviceParams = useMemo(
    () => buildServiceParams(),
    [],
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
  const visibleCategories = useMemo(
    () =>
      filterCatalogCategories({
        categories,
        search: debouncedSearch,
      }),
    [categories, debouncedSearch],
  );
  const visibleServices = useMemo(
    () =>
      sortServicesByPrice(
        filterCatalogServices({
          services: services.filter(({ status }) => status !== 0),
          categories,
          search: debouncedSearch,
        }),
        priceSort,
      ),
    [categories, debouncedSearch, priceSort, services],
  );
  const loading = categoriesLoading || servicesLoading;

  return (
    <PageShell backgroundStyle={catalogBackgroundStyle}>
      <CatalogHero />
      <div className="space-y-10 px-4 pb-20 sm:px-6 md:px-30">
        <ProductFilterBar
          search={search}
          onSearchChange={setSearch}
          priceSort={priceSort}
          onChangePriceSort={setPriceSort}
        />

        {!categoriesLoading ? (
          <CatalogCategoryExplorer categories={visibleCategories} />
        ) : null}

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-black/40 p-10 text-center backdrop-blur-xl">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-white" />
            <p className="mt-5 text-sm text-slate-400">
              {t("catalog.loading")}
            </p>
          </div>
        ) : servicesError ? (
          <StatusCard
            tone="error"
            label={t("common.backendError")}
            title={t("catalog.errorTitle")}
            description={t("catalog.errorDescription")}
            action={
              <Button
                type="button"
                onClick={() => refetch()}
                className="h-11 rounded-full bg-white px-6 text-zinc-900 hover:bg-white/90"
              >
                {t("catalog.retry")}
              </Button>
            }
          />
        ) : visibleServices.length === 0 ? (
          <StatusCard
            tone="empty"
            icon={PackageSearch}
            label={t("common.noDataFound")}
            title={t("catalog.emptyTitle")}
            description={t("catalog.emptyDescription")}
          />
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
