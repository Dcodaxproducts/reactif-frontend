"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Loader2, PackageSearch } from "lucide-react";
import {
  AutomotiveCatalogIntro,
  AutomotiveServicesGrid,
} from "@/components/pages/Automotive/AutomotivePage";
import { StatusCard } from "@/components/common/StatusCard";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/common/PageShell";
import { catalogBackgroundStyle } from "@/data/catalog";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useCategories, useServices } from "@/hooks/useCategories";
import {
  buildCategoryRouteFromNavigationSlug,
  findCategoryByNavigationSlug,
} from "@/lib/category-routes";
import {
  filterCatalogCategories,
  filterCatalogServices,
} from "@/lib/catalog-search";
import type { Service } from "@/types/categories";
import CatalogSection from "./CatalogSection";
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
  const activeServices = useMemo(
    () => services.filter(({ status }) => status !== 0),
    [services],
  );
  const visibleServices = useMemo(
    () =>
      sortServicesByPrice(
        filterCatalogServices({
          services: activeServices,
          categories,
          search: debouncedSearch,
        }),
        priceSort,
      ),
    [activeServices, categories, debouncedSearch, priceSort],
  );
  const loading = categoriesLoading || servicesLoading;
  const automotiveCategory = findCategoryByNavigationSlug(
    categories,
    "automotive",
  );
  const automotiveRoute = automotiveCategory
    ? `/subcategories?id=${automotiveCategory.id}&slug=automotive`
    : buildCategoryRouteFromNavigationSlug("automotive");
  const automotiveServices = automotiveCategory
    ? activeServices
        .filter(({ category_id }) => category_id === automotiveCategory.id)
        .slice(0, 4)
    : activeServices.slice(0, 4);

  return (
    <PageShell backgroundStyle={catalogBackgroundStyle}>
      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="pointer-events-none absolute right-0 top-8 hidden h-28 w-28 rounded-tr-[28px] border-r-4 border-t-4 border-[#f262b5] opacity-80 lg:block" />
        <div className="pointer-events-none absolute bottom-12 right-0 hidden h-28 w-28 rounded-br-[28px] border-b-4 border-r-4 border-[#f262b5] opacity-70 lg:block" />

        <AutomotiveCatalogIntro
          automotiveRoute={automotiveRoute}
          catalogHref="#full-catalog"
        />

        <section className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-100">
                {t("automotive.servicesEyebrow")}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                {t("automotive.servicesTitle")}
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-white/15 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href={automotiveRoute}>
                {t("automotive.allAutomotive")}
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-black/40 p-10 text-center backdrop-blur-xl">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-white" />
              <p className="mt-5 text-sm text-slate-400">
                {t("automotive.loading")}
              </p>
            </div>
          ) : automotiveServices.length > 0 ? (
            <AutomotiveServicesGrid
              services={automotiveServices}
              categoryNamesById={categoryNamesById}
            />
          ) : null}
        </section>

        <section
          id="full-catalog"
          className="scroll-mt-24 space-y-10 border-t border-white/10 pt-12"
        >
          <ProductFilterBar
            search={search}
            onSearchChange={setSearch}
            priceSort={priceSort}
            onChangePriceSort={setPriceSort}
          />

          {!categoriesLoading ? (
            <CatalogCategoryExplorer
              categories={visibleCategories}
              showFeaturedCategory={false}
            />
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
        </section>
      </main>
    </PageShell>
  );
}
