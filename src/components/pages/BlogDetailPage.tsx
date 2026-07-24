"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { PageShell } from "@/components/common/PageShell";
import { ArticleShare } from "@/components/pages/blog/ArticleShare";
import { Button } from "@/components/ui/button";
import { blogArticles, type BlogArticle } from "@/data/blogs";
import { useAppTranslation } from "@/hooks/useAppTranslation";

type BlogDetailPageProps = {
  article: BlogArticle;
  shareUrl: string;
};

const formatArticleDate = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export function BlogDetailPage({ article, shareUrl }: BlogDetailPageProps) {
  const { t } = useAppTranslation();
  const articleTitle = t(
    `staticPages.blogs.articles.${article.key}.title`,
  );
  const relatedArticles = blogArticles.filter(
    (relatedArticle) => relatedArticle.slug !== article.slug,
  );

  return (
    <PageShell>
      <Container gutter="content" width="7xl" className="py-8 md:py-12">
        <Button
          asChild
          variant="outline"
          className="mb-8 h-11 rounded-full border-white/15 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
        >
          <Link href="/blogs">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t("staticPages.blogs.detail.backToBlogs")}
          </Link>
        </Button>

        <article className="overflow-hidden rounded-3xl border border-white/10 bg-black/50 shadow-2xl shadow-black/25 backdrop-blur">
          <header className="grid gap-6 p-5 sm:p-6 md:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:p-10">
            <div className="flex flex-col justify-center gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  {t(`staticPages.blogs.articles.${article.key}.category`)}
                </span>
                <span className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-bold text-white/75">
                  {t(`staticPages.blogs.articles.${article.key}.readTime`)}
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
                  {articleTitle}
                </h1>
                <p className="max-w-3xl text-base leading-7 text-slate-300">
                  {t(`staticPages.blogs.articles.${article.key}.description`)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span>{t("staticPages.blogs.detail.author")}</span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-500 sm:block" />
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {formatArticleDate(article.publishedAt)}
                </span>
              </div>
              <ArticleShare title={articleTitle} url={shareUrl} />
            </div>

            <div className="relative min-h-[260px] overflow-hidden rounded-3xl bg-slate-950 sm:min-h-[320px] lg:min-h-[420px]">
              <Image
                src={article.image}
                alt={t(`staticPages.blogs.articles.${article.key}.title`)}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
          </header>

          <div className="grid gap-8 border-t border-white/10 p-5 sm:p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:p-10">
            <div className="space-y-6">
              {article.bodyKeys.map((key) => (
                <p key={key} className="text-base leading-8 text-slate-300">
                  {t(key)}
                </p>
              ))}
            </div>

            <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-lg font-semibold text-white">
                {t("staticPages.blogs.detail.takeaways")}
              </h2>
              <ul className="mt-5 space-y-4">
                {article.takeawayKeys.map((key) => (
                  <li key={key} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200"
                      aria-hidden="true"
                    />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </article>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-100">
                {t("staticPages.blogs.detail.nextStep")}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                {t("staticPages.blogs.detail.ctaTitle")}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                {t("staticPages.blogs.detail.ctaDescription")}
              </p>
            </div>
            <Button
              asChild
              className="h-11 rounded-full bg-white px-6 text-zinc-900 hover:bg-white/90"
            >
              <Link href="/contact">
                {t("staticPages.blogs.cta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-white">
            {t("staticPages.blogs.detail.relatedTitle")}
          </h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {relatedArticles.map((relatedArticle) => (
              <Link
                key={relatedArticle.slug}
                href={`/blogs/${relatedArticle.slug}`}
                className="group grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-cyan-300/40 md:grid-cols-[180px_1fr]"
              >
                <div className="relative min-h-[180px] bg-slate-950">
                  <Image
                    src={relatedArticle.image}
                    alt={t(
                      `staticPages.blogs.articles.${relatedArticle.key}.title`,
                    )}
                    fill
                    sizes="(min-width: 768px) 180px, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                    {t(
                      `staticPages.blogs.articles.${relatedArticle.key}.category`,
                    )}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-white">
                    {t(`staticPages.blogs.articles.${relatedArticle.key}.title`)}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                    {t(
                      `staticPages.blogs.articles.${relatedArticle.key}.description`,
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </PageShell>
  );
}
