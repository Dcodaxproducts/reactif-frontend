"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import {
  ArrowRight,
  CarFront,
  Loader2,
  PackageSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { StatusCard } from "@/components/common/StatusCard";
import { PageShell } from "@/components/common/PageShell";
import { Button } from "@/components/ui/button";
import { catalogBackgroundStyle } from "@/data/catalog";
import { formatCurrency } from "@/lib/currency";
import { getImageSource } from "@/lib/image-source";
import { buildServiceDetailHref } from "@/lib/service-routes";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useCategories, useServices } from "@/hooks/useCategories";
import {
  buildCategoryRouteFromNavigationSlug,
  findCategoryByNavigationSlug,
} from "@/lib/category-routes";
import type { Service } from "@/types/categories";

const automotiveHighlights = [
  {
    icon: CarFront,
    titleKey: "automotive.highlights.wraps.title",
    descriptionKey: "automotive.highlights.wraps.description",
  },
  {
    icon: ShieldCheck,
    titleKey: "automotive.highlights.protection.title",
    descriptionKey: "automotive.highlights.protection.description",
  },
  {
    icon: Sparkles,
    titleKey: "automotive.highlights.branding.title",
    descriptionKey: "automotive.highlights.branding.description",
  },
];

export function AutomotivePage() {
  const { t } = useAppTranslation();
  const { categories, loading: categoriesLoading } = useCategories({
    per_page: 100,
  });
  const automotiveCategory = findCategoryByNavigationSlug(
    categories,
    "automotive",
  );
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
    refetch,
  } = useServices(
    automotiveCategory
      ? {
          limit: 100,
          category_id: automotiveCategory.id,
        }
      : categoriesLoading
        ? undefined
        : {
            limit: 100,
            search: "automotive",
          },
  );
  const categoryNamesById = new Map(
    categories.map((category) => [category.id, category.name]),
  );
  const visibleServices = services.filter(({ status }) => status !== 0);
  const loading = categoriesLoading || servicesLoading;
  const handleRetry = useCallback(() => {
    void refetch();
  }, [refetch]);
  const automotiveRoute = automotiveCategory
    ? `/subcategories?id=${automotiveCategory.id}&slug=automotive`
    : buildCategoryRouteFromNavigationSlug("automotive");

  return (
    <PageShell backgroundStyle={catalogBackgroundStyle}>
      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="pointer-events-none absolute right-0 top-8 hidden h-28 w-28 rounded-tr-[28px] border-r-4 border-t-4 border-[#f262b5] opacity-80 lg:block" />
        <div className="pointer-events-none absolute bottom-12 right-0 hidden h-28 w-28 rounded-br-[28px] border-b-4 border-r-4 border-[#f262b5] opacity-70 lg:block" />
        <section className="grid min-h-[520px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col items-start gap-6">
            <p className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
              {t("automotive.eyebrow")}
            </p>
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
                {t("automotive.title")}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                {t("automotive.description")}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-full bg-white px-6 text-zinc-950 hover:bg-white/90"
              >
                <Link href={automotiveRoute}>
                  {t("automotive.exploreCategory")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-white/15 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/catalog">{t("automotive.viewCatalog")}</Link>
              </Button>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-black/70 shadow-2xl shadow-black/30">
            <Image
              src="/assets/catalog/carOne.png"
              alt={t("automotive.imageAlt")}
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-contain p-10 transition duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-100">
                {t("automotive.heroCardLabel")}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {t("automotive.heroCardDescription")}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {automotiveHighlights.map((highlight) => {
            const Icon = highlight.icon;

            return (
              <article
                key={highlight.titleKey}
                className="rounded-2xl border border-white/10 bg-black/45 p-5 backdrop-blur"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-cyan-100">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-lg font-bold text-white">
                  {t(highlight.titleKey)}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {t(highlight.descriptionKey)}
                </p>
              </article>
            );
          })}
        </section>

        <section className="space-y-6 pb-12">
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
              <Link href={automotiveRoute}>{t("automotive.allAutomotive")}</Link>
            </Button>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-black/40 p-10 text-center backdrop-blur-xl">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-white" />
              <p className="mt-5 text-sm text-slate-400">
                {t("automotive.loading")}
              </p>
            </div>
          ) : servicesError ? (
            <StatusCard
              tone="error"
              label={t("common.backendError")}
              title={t("automotive.errorTitle")}
              description={t("automotive.errorDescription")}
              action={
                <Button
                  type="button"
                  onClick={handleRetry}
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
              title={t("automotive.emptyTitle")}
              description={t("automotive.emptyDescription")}
              action={
                <Button
                  asChild
                  className="h-11 rounded-full bg-white px-6 text-zinc-900 hover:bg-white/90"
                >
                  <Link href="/catalog">{t("automotive.viewCatalog")}</Link>
                </Button>
              }
            />
          ) : (
            <AutomotiveServicesGrid
              services={visibleServices}
              categoryNamesById={categoryNamesById}
            />
          )}
        </section>
      </main>
    </PageShell>
  );
}


function AutomotiveServicesGrid({
  services,
  categoryNamesById,
}: {
  services: Service[];
  categoryNamesById: Map<number, string>;
}) {
  const { t } = useAppTranslation();

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => {
        const categoryName =
          categoryNamesById.get(service.category_id) ??
          t("catalog.uncategorized");
        const imageSource = getImageSource(
          service.service_image,
          "/assets/catalog/carOne.png",
        );
        const serviceDetailHref = buildServiceDetailHref({
          category: {
            id: service.category_id,
            name: categoryName,
          },
          service,
          from: "catalog",
        });

        return (
          <Link
            href={serviceDetailHref}
            key={service.id}
            className="group relative grid min-h-[330px] overflow-hidden rounded-2xl border border-white/10 bg-[#02030c] transition duration-300 hover:-translate-y-1 hover:border-[#f262b5]/60 hover:shadow-[0_22px_70px_rgba(242,98,181,0.18)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(95,197,255,0.15),transparent_58%)] opacity-70 transition group-hover:opacity-100" />
            <div className="relative flex h-44 items-center justify-center p-7">
              <Image
                src={imageSource}
                alt={service.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain p-5 transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="relative z-10 flex flex-col gap-3 p-5 pt-0">
              <span className="w-fit rounded-full border border-white/10 bg-black/65 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white/85">
                {categoryName}
              </span>
              <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 text-base font-black leading-6 text-white">
                  {service.name}
                </h3>
                <span className="shrink-0 text-xs font-black text-white">
                  {service.price > 0
                    ? formatCurrency(service.price)
                    : t("catalog.priceOnRequest")}
                </span>
              </div>
              <p className="line-clamp-2 text-xs leading-5 text-slate-400">
                {service.description || t("catalog.serviceFallbackDescription")}
              </p>
              <span className="mt-auto text-xs font-semibold text-pink-100 opacity-80 transition group-hover:text-[#f262b5]">
                {t("catalog.viewDetails")} →
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
