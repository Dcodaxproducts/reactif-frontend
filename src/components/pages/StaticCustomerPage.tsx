"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import Link from "next/link";
import { ArrowRight, BookOpen, Images, LifeBuoy } from "lucide-react";
import { Container } from "@/components/common/Container";
import { PageShell } from "@/components/common/PageShell";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";

type StaticPageKey = "blogs" | "portfolio" | "support";

type StaticPageConfig = {
  translationKey: `staticPages.${StaticPageKey}`;
  icon: LucideIcon;
};

const staticPageConfigs: Record<StaticPageKey, StaticPageConfig> = {
  blogs: {
    translationKey: "staticPages.blogs",
    icon: BookOpen,
  },
  portfolio: {
    translationKey: "staticPages.portfolio",
    icon: Images,
  },
  support: {
    translationKey: "staticPages.support",
    icon: LifeBuoy,
  },
};

export function StaticCustomerPage({
  page,
  children,
}: {
  page: StaticPageKey;
  children?: ReactNode;
}) {
  const { t } = useAppTranslation();
  const config = staticPageConfigs[page];
  const Icon = config.icon;

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

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cyan-300">
                <Icon size={24} />
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/60">
                  {t(`${config.translationKey}.eyebrow`)}
                </p>
                <h1 className="max-w-3xl text-3xl font-semibold uppercase leading-tight text-white md:text-5xl">
                  {t(`${config.translationKey}.title`)}
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                  {t(`${config.translationKey}.description`)}
                </p>
              </div>

              <Button
                asChild
                className="h-11 rounded-full bg-white px-5 text-zinc-900 hover:bg-white/90"
              >
                <Link href="/contact" className="inline-flex items-center gap-2">
                  {t(`${config.translationKey}.cta`)}
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4">
              {["first", "second", "third"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur"
                >
                  <h2 className="text-base font-semibold text-white">
                    {t(`${config.translationKey}.cards.${item}.title`)}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {t(`${config.translationKey}.cards.${item}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>
      {children}
    </PageShell>
  );
}
