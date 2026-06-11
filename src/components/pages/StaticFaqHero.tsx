"use client";

import { HelpCircle } from "lucide-react";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function StaticFaqHero() {
  const { t } = useAppTranslation();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/40 p-6 md:p-10">
      <div
        className="absolute inset-0 opacity-60 blur-3xl"
        style={{
          background:
            "conic-gradient(from 132deg at 42% 48%, rgba(95,197,255,0.2), rgba(242,98,181,0.14), rgba(159,115,241,0.18), rgba(95,197,255,0.08))",
        }}
      />

      <div className="relative z-10 max-w-5xl space-y-5">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cyan-300">
          <HelpCircle size={24} />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/60">
          {t("staticPages.faq.eyebrow")}
        </p>
        <h1 className="text-3xl font-semibold leading-tight text-white md:whitespace-nowrap md:text-4xl xl:text-5xl">
          {t("staticPages.faq.title")}
        </h1>
        <p className="text-sm leading-7 text-slate-300 md:text-base">
          {t("staticPages.faq.description")}
        </p>
      </div>
    </section>
  );
}
