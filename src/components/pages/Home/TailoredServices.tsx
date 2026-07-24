"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { featuredCategoryCards } from "@/data/home";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { buildCategoryRoute } from "@/lib/category-routes";

export function TailoredServices() {
  const { t } = useAppTranslation();

  return (
    <section className="relative w-full overflow-hidden bg-[#010101] py-16 md:py-24">
      <Container gutter="topbar">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold lowercase tracking-[0.22em] text-white/70">
            {t("home.featuredCategories.eyebrow")}
          </p>
          <h2 className="mt-5 text-balance text-3xl font-black uppercase tracking-[0.18em] text-white md:text-5xl md:leading-tight">
            {t("home.featuredCategories.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
            {t("home.featuredCategories.description")}
          </p>

          <div className="mx-auto mt-8 grid max-w-sm gap-3 text-sm font-bold sm:max-w-lg">
            <span className="rounded-md bg-[#f21b6d] px-6 py-3 text-black">
              {t("home.featuredCategories.options.road")}
            </span>
            <span className="rounded-md bg-[#f21b6d] px-6 py-3 text-black">
              {t("home.featuredCategories.options.street")}
            </span>
            <span className="rounded-md bg-[#f21b6d] px-6 py-3 text-black">
              {t("home.featuredCategories.options.supports")}
            </span>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
          {featuredCategoryCards.map((card, index) => {
            const href = buildCategoryRoute({ slug: card.slug });

            return (
              <Link
                href={href}
                key={card.slug}
                className={`group relative overflow-hidden rounded-[18px] border bg-[#070707] p-5 text-center transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(242,27,109,0.22)] ${
                  index === 0 ? "border-[#f21b6d]" : "border-white/10"
                }`}
              >
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(242,27,109,0.22),transparent_58%)]" />
                <div className="relative flex aspect-[4/3] items-center justify-center rounded-[14px] bg-[#191d48] p-5">
                  <Image
                    src={card.image}
                    alt={t(card.imageAltKey)}
                    width={420}
                    height={300}
                    sizes="(min-width: 640px) 42vw, 90vw"
                    className="max-h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="relative mt-5 text-sm font-black uppercase tracking-[0.28em] text-white">
                  {t(card.titleKey)}
                </h3>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            asChild
            className="h-12 min-w-[260px] rounded-md bg-[#f21b6d] px-10 text-sm font-bold lowercase text-black hover:bg-[#ff2d7d]"
          >
            <Link href="/catalog">
              {t("home.featuredCategories.seeMore")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
