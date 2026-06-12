"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Container } from "@/components/common/Container";
import { PageShell } from "@/components/common/PageShell";
import { Button } from "@/components/ui/button";
import { blogArticles } from "@/data/blogs";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function BlogsPage() {
  const { t } = useAppTranslation();

  return (
    <PageShell>
      <Container gutter="content" width="7xl" className="py-10 md:py-16">
        <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/50 p-5 shadow-2xl shadow-fuchsia-950/20 sm:p-6 md:p-8 lg:p-10">
          <div
            className="absolute inset-0 opacity-60 blur-3xl"
            style={{
              background:
                "conic-gradient(from 132deg at 42% 48%, rgba(242,98,181,0.18), rgba(95,197,255,0.18), rgba(159,115,241,0.16), rgba(242,98,181,0.08))",
            }}
          />
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-25">
            <Image
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/45 to-black" />
          </div>

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

        <section className="mt-6 grid gap-5 md:mt-8 md:grid-cols-2 xl:grid-cols-3">
          {blogArticles.map((item) => (
            <article
              key={item.key}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]"
            >
              <Link href={`/blogs/${item.slug}`} className="block h-full">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={t(`staticPages.blogs.articles.${item.key}.title`)}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                    <Sparkles size={12} />
                    {t(`staticPages.blogs.articles.${item.key}.category`)}
                  </div>
                  <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-zinc-950">
                    {t(`staticPages.blogs.articles.${item.key}.readTime`)}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-semibold leading-snug text-white">
                    {t(`staticPages.blogs.articles.${item.key}.title`)}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {t(`staticPages.blogs.articles.${item.key}.description`)}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
                    {t("staticPages.blogs.readArticle")}
                    <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </Container>
    </PageShell>
  );
}
