"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarClock, Eye, PackageOpen } from "lucide-react";
import { ServiceBookNowButton } from "@/components/common/ServiceBookNowButton";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { getImageSource } from "@/lib/image-source";
import { buildSubcategoryRoute } from "@/lib/category-routes";
import {
  buildServiceDetailHref,
  buildServiceFlowHref,
} from "@/lib/service-routes";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { Category, Service } from "@/types/categories";

type CategoryServicesListingProps = {
  category: Category;
  services: Service[];
  activeSubcategoryId?: string | null;
};

const getLeadTime = (service: Service) =>
  service.lead_time ?? service.delivery_time ?? null;

export function CategoryServicesListing({
  category,
  services,
  activeSubcategoryId,
}: CategoryServicesListingProps) {
  const { t } = useAppTranslation();
  const categoryImage = getImageSource(category.category_image, "");
  const activeSubcategories = (category.subcategories ?? []).filter(
    ({ status }) => status !== 0,
  );
  const selectedSubcategory = activeSubcategories.find(
    ({ id }) => String(id) === activeSubcategoryId,
  );
  const showSubcategoryPrompt =
    activeSubcategories.length > 0 && !activeSubcategoryId;
  const activeServices = services.filter(({ status }) => status !== 0);

  return (
    <section className="w-full pb-12">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/45 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(236,72,153,0.18),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.14),transparent_28%)]" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-200/80">
              {t("categoryFlow.categoryLabel")}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              {category.name}
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              {category.description || t("categoryFlow.fallbackDescription")}
            </p>
          </div>

          <div className="relative min-h-[220px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80">
            {categoryImage ? (
              <Image
                src={categoryImage}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-fuchsia-950/60 to-cyan-950/50" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </div>
        </div>
      </div>

      {activeSubcategories.length > 0 ? (
        <div className="mt-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
                {t("categoryFlow.subcategoriesLabel")}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                {t("categoryFlow.subcategoriesTitle")}
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              {t("categoryFlow.subcategoryCount", {
                count: activeSubcategories.length,
              })}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {activeSubcategories.map((subcategory) => {
              const subcategoryImage = getImageSource(
                subcategory.category_image,
                "",
              );
              const isSelected = String(subcategory.id) === activeSubcategoryId;

              return (
                <Link
                  key={subcategory.id}
                  href={buildSubcategoryRoute({ category, subcategory })}
                  className={`group overflow-hidden rounded-[22px] border bg-black/40 shadow-xl shadow-black/15 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-200/40 ${
                    isSelected ? "border-cyan-200/50" : "border-white/10"
                  }`}
                >
                  <div className="relative h-44 bg-slate-950">
                    {subcategoryImage ? (
                      <Image
                        src={subcategoryImage}
                        alt={subcategory.name}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-cyan-950/50 to-fuchsia-950/50" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-200/75">
                          {t("categoryFlow.subcategoryLabel")}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-white">
                          {subcategory.name}
                        </h3>
                      </div>
                      <ArrowRight className="mt-1 h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-white" />
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                      {subcategory.description ||
                        t("categoryFlow.subcategoryFallbackDescription")}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
            {t("categoryFlow.servicesLabel")}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
            {selectedSubcategory?.name ?? t("categoryFlow.servicesTitle")}
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          {t("categoryFlow.serviceCount", { count: activeServices.length })}
        </p>
      </div>

      {showSubcategoryPrompt ? (
        <div className="mt-8 rounded-3xl border border-white/10 bg-black/40 p-8 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <PackageOpen className="h-6 w-6 text-cyan-200" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-white">
            {t("categoryFlow.chooseSubcategoryTitle")}
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
            {t("categoryFlow.chooseSubcategoryDescription")}
          </p>
        </div>
      ) : activeServices.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-white/10 bg-black/40 p-8 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <PackageOpen className="h-6 w-6 text-pink-200" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-white">
            {t("categoryFlow.noServicesTitle")}
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
            {t("categoryFlow.noServicesDescription")}
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {activeServices.map((service, index) => {
            const imageSource = getImageSource(service.service_image, "");
            const leadTime = getLeadTime(service);
            const serviceHref = buildServiceFlowHref({
              category,
              service,
              from: "category-listing",
            });
            const serviceDetailHref = buildServiceDetailHref({
              category,
              service,
              from: "category-listing",
            });

            return (
              <article
                key={service.id}
                className="group flex min-h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-black/45 shadow-xl shadow-black/20 backdrop-blur-xl opacity-0 translate-y-6 animate-[fadeUp_0.6s_ease_forwards]"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="relative h-56 overflow-hidden bg-slate-950">
                  {imageSource ? (
                    <Image
                      src={imageSource}
                      alt={service.name}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-fuchsia-950" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  {service.price > 0 ? (
                    <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                      {formatCurrency(service.price)}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold leading-snug text-white">
                    {service.name}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                    {service.description ||
                      t("categoryFlow.serviceFallbackDescription")}
                  </p>

                  <div className="mt-5 grid gap-3 text-sm text-slate-300">
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                      <span>{t("categoryFlow.priceLabel")}</span>
                      <span className="font-semibold text-white">
                        {service.price > 0
                          ? formatCurrency(service.price)
                          : t("categoryFlow.priceUnavailable")}
                      </span>
                    </div>
                    {leadTime ? (
                      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <CalendarClock className="h-4 w-4 text-cyan-200" />
                        <span>{leadTime}</span>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Button
                      asChild
                      variant="outline"
                      className="h-11 rounded-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"
                    >
                      <Link href={serviceDetailHref}>
                        <Eye className="h-4 w-4" />
                        {t("categoryFlow.viewDetails")}
                      </Link>
                    </Button>
                    <ServiceBookNowButton
                      href={serviceHref}
                      serviceName={service.name}
                      label={t("categoryFlow.bookNow")}
                      className="text-zinc-900"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
