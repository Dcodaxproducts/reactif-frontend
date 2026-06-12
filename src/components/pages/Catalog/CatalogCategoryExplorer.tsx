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
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
            {t("catalog.categoryExplorer.eyebrow")}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
            {t("catalog.categoryExplorer.title")}
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          {t("catalog.categoryExplorer.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {activeCategories.map((category) => {
          const categoryImage = getImageSource(category.category_image, "");
          const subcategories = (category.subcategories ?? []).filter(
            ({ status }) => status !== 0,
          );
          const categoryHref = buildCategoryRouteFromCategory(category);

          return (
            <article
              key={category.id}
              className="overflow-hidden rounded-[24px] border border-white/10 bg-black/45 shadow-xl shadow-black/20 backdrop-blur-xl"
            >
              <div className="grid min-h-full md:grid-cols-[180px_1fr]">
                <Link
                  href={categoryHref}
                  className="relative min-h-[180px] bg-slate-950"
                  aria-label={t("catalog.categoryExplorer.openCategory", {
                    name: category.name,
                  })}
                >
                  {categoryImage ? (
                    <Image
                      src={categoryImage}
                      alt={category.name}
                      fill
                      sizes="(min-width: 1024px) 180px, 100vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-cyan-950/60 to-fuchsia-950/50" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </Link>

                <div className="flex min-h-full flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-200/75">
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
                        {subcategories.map((subcategory) => (
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
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
