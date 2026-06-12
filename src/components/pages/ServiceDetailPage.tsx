"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarClock, ImageIcon, PackageCheck } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";

import { Container } from "@/components/common/Container";
import { PageShell } from "@/components/common/PageShell";
import { ServiceBookNowButton } from "@/components/common/ServiceBookNowButton";
import { StatusCard } from "@/components/common/StatusCard";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useCategoryDetail, useServiceDetail } from "@/hooks/useCategories";
import { formatCurrency } from "@/lib/currency";
import {
  PAINT_PROTECTION_FALLBACK_IMAGE,
  getImageSource,
} from "@/lib/image-source";
import { buildServiceFlowHref } from "@/lib/service-routes";
import type { Service } from "@/types/categories";

const getLeadTime = (service: Service) =>
  service.lead_time ?? service.delivery_time ?? null;

const uniqueImages = (images: Array<string | null | undefined>) =>
  images.filter(
    (image, index): image is string =>
      Boolean(image) && images.indexOf(image) === index,
  );

export function ServiceDetailPage() {
  const { t } = useAppTranslation();
  const params = useParams();
  const searchParams = useSearchParams();
  const serviceId =
    typeof params?.id === "string" ? params.id : searchParams.get("serviceId");
  const queryCategoryId = searchParams.get("categoryId");

  const {
    service,
    loading: serviceLoading,
    error: serviceError,
    refetch,
  } = useServiceDetail(serviceId);
  const categoryId = queryCategoryId ?? service?.category_id ?? null;
  const { category, loading: categoryLoading } = useCategoryDetail(categoryId);
  const loading = serviceLoading || (Boolean(categoryId) && categoryLoading);

  const categoryName =
    category?.name ?? searchParams.get("categorySlug") ?? t("catalog.uncategorized");
  const bookingHref = service
    ? buildServiceFlowHref({
        category: category
          ? { id: category.id, name: category.name }
          : { id: service.category_id, name: categoryName },
        service,
        from: "service-detail",
      })
    : "/catalog";
  const leadTime = service ? getLeadTime(service) : null;
  const gallery = service
    ? uniqueImages([service.service_image, ...(service.image_gallery ?? [])])
    : [];
  const heroImage = getImageSource(gallery[0], PAINT_PROTECTION_FALLBACK_IMAGE);

  return (
    <PageShell className="min-h-screen">
      <Container gutter="page" className="py-10 md:py-14">
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-black/45 p-10 text-center backdrop-blur-xl">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-white/15 border-t-white" />
            <p className="mt-5 text-sm text-slate-400">
              {t("serviceDetail.loading")}
            </p>
          </div>
        ) : serviceError || !service ? (
          <StatusCard
            tone="error"
            label={t("common.backendError")}
            title={t("serviceDetail.errorTitle")}
            description={t("serviceDetail.errorDescription")}
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
        ) : (
          <article className="space-y-8">
            <section className="grid gap-8 rounded-[32px] border border-white/10 bg-black/45 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[340px] overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 md:min-h-[520px]">
                <Image
                  src={heroImage}
                  alt={service.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-100 backdrop-blur">
                  {categoryName}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-200/80">
                  {t("serviceDetail.eyebrow")}
                </p>
                <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
                  {service.name}
                </h1>
                <p className="mt-5 text-sm leading-7 text-slate-300 md:text-base">
                  {service.description || t("serviceDetail.descriptionFallback")}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {t("serviceDetail.price")}
                    </span>
                    <strong className="mt-2 block text-lg text-white">
                      {service.price > 0
                        ? formatCurrency(service.price)
                        : t("serviceDetail.priceOnRequest")}
                    </strong>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {t("serviceDetail.delivery")}
                    </span>
                    <strong className="mt-2 block text-lg text-white">
                      {leadTime ?? t("serviceDetail.deliveryOnRequest")}
                    </strong>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <ServiceBookNowButton
                    href={bookingHref}
                    serviceName={service.name}
                    label={t("serviceDetail.bookNow")}
                    className="w-full"
                  />
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-full border-white/15 bg-transparent px-4 text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href={`/support?serviceId=${encodeURIComponent(String(service.id))}`}>
                      {t("serviceDetail.requestQuote")}
                    </Link>
                  </Button>
                </div>
              </div>
            </section>

            <section className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 text-white">
                  <PackageCheck className="h-5 w-5 text-pink-200" />
                  <h2 className="text-xl font-semibold">
                    {t("serviceDetail.summaryTitle")}
                  </h2>
                </div>
                <div className="mt-5 grid gap-3 text-sm text-slate-300">
                  <div className="flex justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <span>{t("serviceDetail.category")}</span>
                    <span className="text-right font-semibold text-white">
                      {categoryName}
                    </span>
                  </div>
                  {leadTime ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                      <CalendarClock className="h-4 w-4 shrink-0 text-cyan-200" />
                      <span>{leadTime}</span>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 text-white">
                  <ImageIcon className="h-5 w-5 text-cyan-200" />
                  <h2 className="text-xl font-semibold">
                    {t("serviceDetail.galleryTitle")}
                  </h2>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {(gallery.length ? gallery : [heroImage]).slice(0, 6).map((image) => (
                    <div
                      key={image}
                      className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-slate-950"
                    >
                      <Image
                        src={getImageSource(image, PAINT_PROTECTION_FALLBACK_IMAGE)}
                        alt={service.name}
                        fill
                        sizes="(min-width: 768px) 20vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </article>
        )}
      </Container>
    </PageShell>
  );
}
