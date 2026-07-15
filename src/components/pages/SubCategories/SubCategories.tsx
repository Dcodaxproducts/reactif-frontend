"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2, PackageSearch, Sparkles } from "lucide-react";

import CatalogScroller from "@/components/pages/Catalog/CatalogScroller";
import { StatusCard } from "@/components/common/StatusCard";
import { Button } from "@/components/ui/button";
import { getImageSource } from "@/lib/image-source";
import { buildCategoryRouteFromCategory } from "@/lib/category-routes";
import { useCategories, useServices } from "@/hooks/useCategories";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { Category } from "@/types/categories";

const fallbackCategoryCards = [
  {
    match: ["auto", "vehicle", "vehicule", "véhicule", "automobile"],
    title: "Automobiles",
    subtitle: "Habillages, covering et marquage véhicule.",
    image: "/assets/catalog/carOne.png",
  },
  {
    match: ["paper", "papier", "papeterie", "stationery"],
    title: "Papeterie",
    subtitle: "Cartes, supports imprimés et documents de marque.",
    image: "/assets/PaintProtection/stickers.png",
  },
  {
    match: ["prestation", "graph", "signage", "signal"],
    title: "Signalétique",
    subtitle: "Enseignes, autocollants et supports visuels.",
    image: "/assets/PaintProtection/signage.png",
  },
  {
    match: ["enseigne", "sign", "display", "visual"],
    title: "Enseignes",
    subtitle: "Solutions visibles pour vitrines, stands et points de vente.",
    image: "/assets/PaintProtection/office.png",
  },
];

const pickFeaturedCategories = (categories: Category[]) => {
  const activeCategories = categories.filter(({ status }) => status !== 0);
  const picked: Category[] = [];

  fallbackCategoryCards.forEach(({ match }) => {
    const found = activeCategories.find((category) => {
      const haystack = `${category.name} ${category.description ?? ""}`.toLowerCase();
      return match.some((keyword) => haystack.includes(keyword));
    });

    if (found && !picked.some(({ id }) => id === found.id)) {
      picked.push(found);
    }
  });

  activeCategories.some((category) => {
    if (picked.length >= 4) {
      return true;
    }

    if (!picked.some(({ id }) => id === category.id)) {
      picked.push(category);
    }

    return false;
  });

  return picked.slice(0, 4);
};

const getFallbackCard = (category: Category, index: number) => {
  const haystack = `${category.name} ${category.description ?? ""}`.toLowerCase();

  return (
    fallbackCategoryCards.find(({ match }) =>
      match.some((keyword) => haystack.includes(keyword)),
    ) ?? fallbackCategoryCards[index % fallbackCategoryCards.length]
  );
};

export default function SubCategories() {
  const { t } = useAppTranslation();
  const { categories, loading: categoriesLoading } = useCategories({
    per_page: 100,
  });
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
  } = useServices({ per_page: 100 });
  const featuredCategories = pickFeaturedCategories(categories);
  const categoryNamesById = new Map(
    categories.map((category) => [category.id, category.name]),
  );
  const featuredServices = services
    .filter(({ status }) => status !== 0)
    .slice(0, 8);
  const loading = categoriesLoading || servicesLoading;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid min-h-[500px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <p className="rounded-full border border-pink-300/25 bg-pink-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-pink-100 w-fit">
              Nos best-sellers
            </p>
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl font-black leading-tight tracking-[-0.04em] text-white md:text-6xl">
                Comment voulez-vous que l’on remarque votre marque ?
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                Choisissez parmi nos catégories principales, puis explorez les options et services les plus demandés.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-full bg-white px-6 text-zinc-950 hover:bg-white/90">
                <Link href="#catalogue">
                  Voir le catalogue
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-white/15 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white">
                <Link href="/#contact">Demander un devis</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[32px] border border-pink-400/80 bg-black p-5 shadow-[0_0_0_1px_rgba(236,72,153,0.25),0_28px_80px_rgba(0,0,0,0.55)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {featuredCategories.map((category, index) => {
                const fallback = getFallbackCard(category, index);
                const image = getImageSource(category.category_image, fallback.image);
                const href = buildCategoryRouteFromCategory(category);

                return (
                  <Link
                    key={category.id}
                    href={href}
                    className="group rounded-3xl border border-white/10 bg-[#171d4c] p-5 transition hover:-translate-y-1 hover:border-pink-300/70"
                  >
                    <div className="relative mb-5 h-40 overflow-hidden rounded-2xl bg-black/45">
                      <Image
                        src={image}
                        alt={category.name || fallback.title}
                        fill
                        sizes="(min-width: 1024px) 260px, 50vw"
                        className="object-contain p-7 transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h2 className="text-center text-sm font-black uppercase tracking-[0.18em] text-white">
                      {category.name || fallback.title}
                    </h2>
                    <p className="mt-2 text-center text-xs leading-5 text-slate-300">
                      {category.description || fallback.subtitle}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <section id="categories" className="space-y-6 scroll-mt-28">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-pink-100">
                Catégories principales
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white md:text-3xl">
                4 catégories avec accès rapide
              </h2>
            </div>
            <Button asChild variant="outline" className="h-11 rounded-full border-white/15 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white">
              <Link href="/catalog">See more</Link>
            </Button>
          </div>

          {categoriesLoading ? (
            <div className="rounded-3xl border border-white/10 bg-black/40 p-10 text-center">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-white" />
            </div>
          ) : featuredCategories.length === 0 ? (
            <StatusCard
              tone="empty"
              icon={PackageSearch}
              label={t("common.noDataFound")}
              title={t("catalog.emptyTitle")}
              description={t("catalog.emptyDescription")}
            />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featuredCategories.map((category, index) => {
                const fallback = getFallbackCard(category, index);
                const image = getImageSource(category.category_image, fallback.image);
                const href = buildCategoryRouteFromCategory(category);

                return (
                  <article
                    key={category.id}
                    className="rounded-3xl border border-white/10 bg-black/55 p-5 shadow-xl shadow-black/30"
                  >
                    <div className="relative mb-5 h-36 overflow-hidden rounded-2xl bg-white/[0.03]">
                      <Image
                        src={image}
                        alt={category.name || fallback.title}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="object-contain p-6"
                      />
                    </div>
                    <div className="mb-3 flex items-center gap-2 text-pink-200">
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em]">Best-seller</span>
                    </div>
                    <h3 className="text-xl font-black text-white">{category.name || fallback.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
                      {category.description || fallback.subtitle}
                    </p>
                    <Button asChild className="mt-5 h-11 w-full rounded-full bg-white px-5 text-zinc-900 hover:bg-white/90">
                      <Link href={href}>
                        See more
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section id="catalogue" className="space-y-6 scroll-mt-28 pb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-pink-100">
              Catalogue
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white md:text-3xl">
              Services réservables
            </h2>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-black/40 p-10 text-center">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-white" />
            </div>
          ) : servicesError ? (
            <StatusCard
              tone="error"
              label={t("common.backendError")}
              title={t("catalog.errorTitle")}
              description={t("catalog.errorDescription")}
            />
          ) : featuredServices.length === 0 ? (
            <StatusCard
              tone="empty"
              icon={PackageSearch}
              label={t("common.noDataFound")}
              title={t("catalog.emptyTitle")}
              description={t("catalog.emptyDescription")}
            />
          ) : (
            <CatalogScroller
              services={featuredServices}
              categoryNamesById={categoryNamesById}
            />
          )}
        </section>
      </section>
    </main>
  );
}
