"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, MapPin, Star, UserCheck } from "lucide-react";

import { Container } from "@/components/common/Container";
import { PageShell } from "@/components/common/PageShell";
import { StatusCard } from "@/components/common/StatusCard";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useDesigners } from "@/hooks/useDesigners";
import {
  PROFILE_AVATAR_FALLBACK,
  getImageSource,
} from "@/lib/image-source";
import {
  buildDesignerSelectHref,
  getDesignerSelectionFallbackHref,
} from "@/lib/designer-routes";

export function DesignerProfilePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { t } = useAppTranslation();
  const designerId = typeof params?.id === "string" ? params.id : null;
  const queryString = searchParams.toString();
  const { designers, loading, error, refetch } = useDesigners({ per_page: 100 });
  const designer = designers.find(({ id }) => String(id) === String(designerId));
  const selectHref = designer
    ? buildDesignerSelectHref({ designerId: designer.id, queryString })
    : null;

  return (
    <PageShell className="min-h-screen">
      <Container gutter="page" className="py-10 md:py-14">
        <Link
          href={`/all-vendor-services${queryString ? `?${queryString}` : ""}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("designers.backToDesigners")}
        </Link>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-black/45 p-10 text-center backdrop-blur-xl">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-white/15 border-t-white" />
            <p className="mt-5 text-sm text-slate-400">
              {t("designers.loadingProfile")}
            </p>
          </div>
        ) : error ? (
          <StatusCard
            tone="error"
            label={t("common.backendError")}
            title={t("designers.errorTitle")}
            description={error}
            action={
              <Button
                type="button"
                onClick={() => refetch()}
                className="h-11 rounded-full bg-white px-6 text-zinc-900 hover:bg-white/90"
              >
                {t("common.tryAgain")}
              </Button>
            }
          />
        ) : !designer ? (
          <StatusCard
            tone="empty"
            label={t("common.noDataFound")}
            title={t("designers.notFoundTitle")}
            description={t("designers.notFoundDescription")}
            action={
              <Button
                asChild
                className="h-11 rounded-full bg-white px-6 text-zinc-900 hover:bg-white/90"
              >
                <Link href="/all-vendor-services">
                  {t("designers.backToDesigners")}
                </Link>
              </Button>
            }
          />
        ) : (
          <article className="grid gap-8 rounded-[32px] border border-white/10 bg-black/45 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[360px] overflow-hidden rounded-[28px] border border-white/10 bg-slate-950">
              <Image
                src={getImageSource(designer.profile_image, PROFILE_AVATAR_FALLBACK)}
                alt={designer.name}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-100 backdrop-blur">
                {designer.is_available
                  ? t("designers.available")
                  : t("designers.unavailable")}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-200/80">
                {t("designers.profileEyebrow")}
              </p>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
                {designer.name || t("designers.unnamed")}
              </h1>
              <p className="mt-5 text-sm leading-7 text-slate-300 md:text-base">
                {t("designers.profileDescription")}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <Star className="h-5 w-5 text-amber-200" aria-hidden="true" />
                  <span className="mt-2 block text-sm text-slate-400">
                    {t("designers.rating")}
                  </span>
                  <strong className="mt-1 block text-lg text-white">
                    {designer.rating ?? 0}
                  </strong>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <MapPin className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                  <span className="mt-2 block text-sm text-slate-400">
                    {t("designers.location")}
                  </span>
                  <strong className="mt-1 block text-sm text-white">
                    {designer.address || t("designers.locationFallback")}
                  </strong>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <UserCheck className="h-5 w-5 text-emerald-200" aria-hidden="true" />
                  <span className="mt-2 block text-sm text-slate-400">
                    {t("designers.status")}
                  </span>
                  <strong className="mt-1 block text-sm text-white">
                    {designer.is_online ? t("designers.online") : t("designers.offline")}
                  </strong>
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {selectHref ? (
                  <Button
                    asChild
                    className="h-11 rounded-full bg-pink-400 px-4 text-white hover:bg-pink-500"
                  >
                    <Link href={selectHref}>{t("designers.selectDesigner")}</Link>
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="h-11 rounded-full bg-amber-300 px-4 text-slate-950 hover:bg-amber-200"
                  >
                    <Link href={getDesignerSelectionFallbackHref(queryString)}>
                      {t("designers.chooseServiceFirst")}
                    </Link>
                  </Button>
                )}
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-full border-white/15 bg-transparent px-4 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/support">{t("designers.contactSupport")}</Link>
                </Button>
              </div>
            </div>
          </article>
        )}
      </Container>
    </PageShell>
  );
}
