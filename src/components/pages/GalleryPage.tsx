"use client";

import Image from "next/image";
import { Container } from "@/components/common/Container";
import { PageShell } from "@/components/common/PageShell";
import { galleryItems } from "@/data/home";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function GalleryPage() {
  const { t } = useAppTranslation();

  return (
    <PageShell className="min-h-screen bg-[#010101]">
      <Container gutter="page" className="py-14 md:py-24">
        <div className="max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#f21b6d]">
            {t("gallery.eyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-[0.08em] text-white md:text-6xl">
            {t("gallery.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            {t("gallery.description")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <article
              key={item.src}
              className="overflow-hidden rounded-[26px] border border-white/10 bg-[#050505] shadow-2xl shadow-black/30"
            >
              <div className="relative aspect-[4/3] bg-[#111]">
                <Image
                  src={item.src}
                  alt={t(item.titleKey)}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-6"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-white">
                  {t(item.titleKey)}
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/55">
                  {t(item.descriptionKey)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </PageShell>
  );
}
