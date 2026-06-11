"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/common/Container";
import { PageShell } from "@/components/common/PageShell";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";

const blogItems = ["first", "second", "third"] as const;

export function BlogsPage() {
  const { t } = useAppTranslation();

  return (
    <PageShell>
      <Container gutter="page" width="7xl" className="py-14 md:py-24">
        <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/40 p-6 md:p-10">
          <div
            className="absolute inset-0 opacity-60 blur-3xl"
            style={{
              background:
                "conic-gradient(from 132deg at 42% 48%, rgba(242,98,181,0.18), rgba(95,197,255,0.18), rgba(159,115,241,0.16), rgba(242,98,181,0.08))",
            }}
          />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cyan-300">
              <BookOpen size={24} />
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/60">
                {t("staticPages.blogs.eyebrow")}
              </p>
              <h1 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
                {t("staticPages.blogs.title")}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                {t("staticPages.blogs.description")}
              </p>
            </div>

            <Button
              asChild
              className="h-11 rounded-full bg-white px-5 text-zinc-900 hover:bg-white/90"
            >
              <Link href="/contact" className="inline-flex items-center gap-2">
                {t("staticPages.blogs.cta")}
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:mt-10 lg:grid-cols-3">
          {blogItems.map((item) => (
            <article
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-white/25"
            >
              <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                <span>{t(`staticPages.blogs.articles.${item}.category`)}</span>
                <span>{t(`staticPages.blogs.articles.${item}.readTime`)}</span>
              </div>
              <h2 className="mt-5 text-xl font-semibold leading-snug text-white">
                {t(`staticPages.blogs.articles.${item}.title`)}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {t(`staticPages.blogs.articles.${item}.description`)}
              </p>
            </article>
          ))}
        </section>
      </Container>
    </PageShell>
  );
}
