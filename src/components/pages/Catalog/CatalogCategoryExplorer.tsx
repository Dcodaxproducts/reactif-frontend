"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers3, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getImageSource } from "@/lib/image-source";
import {
  buildCategoryRouteFromCategory,
  buildSubcategoryRoute,
} from "@/lib/category-routes";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { Category } from "@/types/categories";

type CatalogCategoryExplorerProps = {
  categories: Category[];
};

const getActiveSubcategories = (category: Category) =>
  (category.subcategories ?? []).filter(({ status }) => status !== 0);

export function CatalogCategoryExplorer({
  categories,
}: CatalogCategoryExplorerProps) {
  const { t } = useAppTranslation();
  const activeCategories = categories.filter(({ status }) => status !== 0);
  const featuredCategory = activeCategories[0];

  if (activeCategories.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f21b6d]">
            {t("catalog.categoryExplorer.eyebrow")}
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-[0.08em] text-white md:text-4xl">
            {t("catalog.categoryExplorer.title")}
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          {t("catalog.categoryExplorer.description")}
        </p>
      </div>

      {featuredCategory ? (
        <FeaturedCategory category={featuredCategory} />
      ) : null}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {activeCategories.map((category) => (
          <CategoryExplorerCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

function FeaturedCategory({ category }: { category: Category }) {
  const { t } = useAppTranslation();
  const categoryImage = getImageSource(category.category_image, "");
  const subcategories = getActiveSubcategories(category).slice(0, 4);
  const categoryHref = buildCategoryRouteFromCategory(category);

  return (
    <article className="overflow-hidden rounded-[30px] border border-[#f21b6d]/60 bg-[#030303] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
      <div className="grid gap-6 p-5 md:grid-cols-[1.05fr_0.95fr] md:p-8 lg:p-10">
        <div className="flex flex-col justify-center py-4">
          <span className="w-fit rounded-full bg-[#f21b6d] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-black">
            {category.name}
          </span>
          <h3 className="mt-5 max-w-xl text-3xl font-black leading-tight text-white md:text-5xl">
            Communication visuelle automobile prête pour la route.
          </h3>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
            {category.description ||
              t("catalog.categoryExplorer.fallbackDescription")}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              className="h-11 rounded-full bg-white px-5 text-zinc-900 hover:bg-white/90"
            >
              <Link href={categoryHref}>
                {t("catalog.categoryExplorer.viewServices")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-white/15 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/catalog">{t("nav.catalog")}</Link>
            </Button>
          </div>
        </div>

        <div className="relative min-h-[300px] overflow-hidden rounded-[24px] bg-[#050505]">
          {categoryImage ? (
            <Image
              src={categoryImage}
              alt={category.name}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-contain p-8"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(242,27,109,0.28),transparent_46%),linear-gradient(135deg,#050505,#171717)]" />
          )}
          <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/72 p-4 backdrop-blur">
            <div className="grid gap-3 text-xs text-slate-300 sm:grid-cols-3">
              {subcategories.length > 0 ? (
                subcategories.slice(0, 3).map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    href={buildSubcategoryRoute({ category, subcategory })}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 transition hover:border-[#f21b6d]/60 hover:text-white"
                  >
                    {subcategory.name}
                  </Link>
                ))
              ) : (
                <span className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3">
                  {t("catalog.categoryExplorer.noSubcategories")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function CategoryExplorerCard({ category }: { category: Category }) {
  const { t } = useAppTranslation();
  const categoryImage = getImageSource(category.category_image, "");
  const subcategories = getActiveSubcategories(category);
  const categoryHref = buildCategoryRouteFromCategory(category);

  return (
    <article className="overflow-hidden rounded-[24px] border border-white/10 bg-[#050505] shadow-xl shadow-black/20 transition hover:border-[#f21b6d]/50">
      <div className="grid min-h-full md:grid-cols-[160px_1fr]">
        <Link
          href={categoryHref}
          className="relative min-h-[170px] bg-[#111]"
          aria-label={t("catalog.categoryExplorer.openCategory", {
            name: category.name,
          })}
        >
          {categoryImage ? (
            <Image
              src={categoryImage}
              alt={category.name}
              fill
              sizes="(min-width: 1024px) 160px, 100vw"
              className="object-contain p-4 transition duration-500 hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#070707] via-[#151515] to-[#2a0d1c]" />
          )}
        </Link>

        <div className="flex min-h-full flex-col p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f21b6d]">
                {t("catalog.categoryExplorer.category")}
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-snug text-white">
                {category.name}
              </h3>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <Layers3 className="h-5 w-5 text-cyan-200" />
            </div>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
            {category.description ||
              t("catalog.categoryExplorer.fallbackDescription")}
          </p>

          <div className="mt-5 flex flex-1 flex-col gap-3">
            {subcategories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {subcategories.slice(0, 5).map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    href={buildSubcategoryRoute({
                      category,
                      subcategory,
                    })}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-[#f21b6d]/60 hover:bg-[#f21b6d]/10 hover:text-white"
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                <PackageSearch className="h-4 w-4 text-pink-200" />
                {t("catalog.categoryExplorer.noSubcategories")}
              </div>
            )}
          </div>

          <Button
            asChild
            className="mt-5 h-11 rounded-full bg-white px-5 text-zinc-900 hover:bg-white/90"
          >
            <Link href={categoryHref}>
              {subcategories.length > 0
                ? t("catalog.categoryExplorer.viewSubcategories")
                : t("catalog.categoryExplorer.viewServices")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
