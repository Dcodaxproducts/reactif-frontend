"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { whyChooseUsRows } from "@/data/home";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function WhyChooseUs() {
  const { t } = useAppTranslation();

  return (
    <section className="relative overflow-hidden bg-[#010101] py-16 md:py-28">
      <Container gutter="page">
        <div className="max-w-xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70">
            {t("home.why.badge")}
          </p>
          <h2 className="mt-5 text-3xl font-black uppercase leading-tight tracking-[0.08em] text-white md:text-5xl">
            {t("home.why.titlePrefix")} <br />
            {t("home.why.titleAccent")} RÉACTIFPUB?
          </h2>
        </div>

        <div className="mt-12 space-y-8 md:mt-16 md:space-y-10">
          {whyChooseUsRows.map((row) => (
            <article
              key={row.id}
              className="grid items-center gap-6 border-b border-white/10 pb-8 md:grid-cols-[190px_1fr_80px_1.2fr] md:gap-10 md:pb-10"
            >
              <div className="relative h-28 overflow-hidden rounded-sm bg-white/5 md:h-24">
                <Image
                  src={row.gifUrl}
                  alt=""
                  fill
                  unoptimized
                  sizes="(min-width: 768px) 190px, 100vw"
                  className="object-cover"
                />
              </div>

              <h3 className="text-[15px] font-medium leading-snug tracking-normal text-white/90 md:text-base">
                {t(row.titleKey)}
              </h3>

              <ArrowRight className="hidden h-8 w-8 text-white md:block" />

              <p className="text-sm font-semibold leading-7 text-white/85 md:text-base">
                {t(row.descriptionKey)}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
