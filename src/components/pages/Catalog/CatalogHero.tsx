"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CarFront, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";

const catalogHighlights = [
  {
    icon: CarFront,
    titleKey: "catalog.hero.highlights.automotive.title",
    descriptionKey: "catalog.hero.highlights.automotive.description",
  },
  {
    icon: Palette,
    titleKey: "catalog.hero.highlights.design.title",
    descriptionKey: "catalog.hero.highlights.design.description",
  },
  {
    icon: Sparkles,
    titleKey: "catalog.hero.highlights.finish.title",
    descriptionKey: "catalog.hero.highlights.finish.description",
  },
];

export default function CatalogHero() {
  const { t } = useAppTranslation();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-14">
      <div className="grid min-h-[520px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col items-start gap-6">
          <p className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
            {t("catalog.hero.eyebrow")}
          </p>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl leading-tight font-black tracking-[-0.04em] text-white md:text-6xl">
              {t("catalog.hero.title")}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              {t("catalog.hero.description")}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-full bg-white px-6 text-zinc-950 hover:bg-white/90"
            >
              <Link href="#categories">
                {t("catalog.hero.exploreCategories")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/15 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/automotive">{t("catalog.hero.viewAutomotive")}</Link>
            </Button>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-5 shadow-2xl shadow-black/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(236,72,153,0.26),transparent_32%),radial-gradient(circle_at_72%_50%,rgba(34,211,238,0.22),transparent_36%)]" />
          <div className="relative grid h-full grid-cols-2 gap-4">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <Image
                src="/assets/catalog/carOne.png"
                alt={t("catalog.hero.galleryAltOne")}
                fill
                priority
                sizes="(min-width: 1024px) 280px, 44vw"
                className="object-contain p-8"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] translate-y-8">
              <Image
                src="/assets/catalog/carTwo.png"
                alt={t("catalog.hero.galleryAltTwo")}
                fill
                priority
                sizes="(min-width: 1024px) 280px, 44vw"
                className="object-contain p-8"
              />
            </div>
            <div className="relative col-span-2 min-h-[150px] overflow-hidden rounded-2xl border border-white/10 bg-black/55 p-5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-100">
                {t("catalog.hero.cardLabel")}
              </p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                {t("catalog.hero.cardDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {catalogHighlights.map((highlight) => {
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
      </div>
    </section>
  );
}
