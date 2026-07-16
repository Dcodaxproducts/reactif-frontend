"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { galleryItems } from "@/data/home";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function GallerySection() {
  const { t } = useAppTranslation();

  return (
    <section id="gallery" className="bg-[#010101] py-16 md:py-24">
      <Container gutter="page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#f21b6d]">
              {t("gallery.eyebrow")}
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase tracking-[0.08em] text-white md:text-5xl">
              {t("gallery.title")}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
              {t("gallery.description")}
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-white/20 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/gallery">
              {t("gallery.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.slice(0, 6).map((item) => (
            <Link
              href="/gallery"
              key={item.src}
              className="group overflow-hidden rounded-[24px] border border-white/10 bg-[#050505] transition hover:-translate-y-1 hover:border-[#f21b6d]/70"
            >
              <div className="relative aspect-[4/3] bg-[#121212]">
                <Image
                  src={item.src}
                  alt={t(item.titleKey)}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-6 transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white">
                  {t(item.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  {t(item.descriptionKey)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
