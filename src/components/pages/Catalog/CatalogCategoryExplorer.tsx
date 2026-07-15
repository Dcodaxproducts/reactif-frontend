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

export function CatalogCategoryExplorer({
  categories,
}: CatalogCategoryExplorerProps) {
  const { t } = useAppTranslation();
  const activeCategories = categories.filter(({ status }) => status !== 0);

  if (activeCategories.length === 0) {
    return null;
  }

  return (
    <section id="categories" className="space-y-7 scroll-mt-28">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-pink-100">
            {t("catalog.categoryExplorer.eyebrow")}
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-white md:text-4xl">
            {t("catalog.categoryExplorer.title")}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          {t("catalog.categoryExplorer.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {activeCategories.map((category) => {
          const categoryImage = getImageSource(category.category_image, "");
          const subcategories = (category.subcategories ?? []).filter(
            ({ status }) => status !== 0,
          );
          const categoryHref = buildCategoryRouteFromCategory(category);
          const visibleSubcategories = subcategories.slice(0, 3);

          return (
            <article
              key={category.id}
              className="group overflow-hidden rounded-[28px] border border-white/10 bg-black/55 shadow-xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/25"
            >
              <Link
                href={categoryHref}
                className="relative block min-h-[210px] bg-zinc-950"
                aria-label={t("catalog.categoryExplorer.openCategory", {
                  name: category.name,
                })}
              >
                {categoryImage ? (
                  <Image
                    src={categoryImage}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_22%,rgba(236,72,153,0.28),transparent_38%),radial-gradient(circle_at_72%_58%,rgba(34,211,238,0.24),transparent_40%)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-cyan-100 backdrop-blur">
                  <Layers3 className="h-5 w-5" aria-hidden="true" />
                </div>
              </Link>

              <div className="flex min-h-[285px] flex-col p-5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-pink-200/75">
                  {t("catalog.categoryExplorer.category")}
                </p>
                <h3 className="mt-2 text-2xl font-black leading-tight tracking-[-0.03em] text-white">
                  {category.name}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                  {category.description ||
                    t("catalog.categoryExplorer.fallbackDescription")}
                </p>

                <div className="mt-5 flex flex-1 flex-col gap-3">
                  {visibleSubcategories.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {visibleSubcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          href={buildSubcategoryRoute({
                            category,
                            subcategory,
                          })}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-cyan-200/40 hover:bg-cyan-200/10 hover:text-white"
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
            </article>
          );
        })}
      </div>
    </section>
  );
}
