import Image from "next/image";
import Link from "next/link";
import { CalendarClock } from "lucide-react";

import { ServiceBookNowButton } from "@/components/common/ServiceBookNowButton";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { getImageSource } from "@/lib/image-source";
import {
  buildServiceDetailHref,
  buildServiceFlowHref,
} from "@/lib/service-routes";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { CatalogCardProps } from "@/types/component-props";

const getLeadTime = (service: CatalogCardProps["service"]) =>
  service.lead_time ?? service.delivery_time ?? null;

function CatalogCard({ service, categoryName }: CatalogCardProps) {
  const { t } = useAppTranslation();
  const imageSource = getImageSource(service.service_image, "");
  const serviceHref = buildServiceFlowHref({
    category: {
      id: service.category_id,
      name: categoryName,
    },
    service,
    from: "catalog",
  });
  const serviceDetailHref = buildServiceDetailHref({
    category: {
      id: service.category_id,
      name: categoryName,
    },
    service,
    from: "catalog",
  });
  const leadTime = getLeadTime(service);

  return (
    <article className="group grid h-full min-h-[560px] grid-rows-[220px_1fr] overflow-hidden rounded-2xl border border-white/10 bg-[#010304]/95 shadow-xl shadow-black/25 transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="relative overflow-hidden bg-slate-950">
        {imageSource ? (
          <Image
            src={imageSource}
            alt={service.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-fuchsia-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-full border border-white/15 bg-black/70 px-4 py-2 text-xs font-bold uppercase tracking-wide text-pink-100 backdrop-blur">
          <span className="block truncate">{categoryName}</span>
        </div>
      </div>

      <div className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-5 p-5">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="min-w-0 break-words text-lg font-bold leading-6 text-white">
              {service.name}
            </h3>
            <span className="shrink-0 whitespace-nowrap text-sm font-bold text-white">
              {service.price > 0
                ? formatCurrency(service.price)
                : t("catalog.priceOnRequest")}
            </span>
          </div>

          <p className="break-words text-sm leading-6 text-slate-400">
            {service.description || t("catalog.serviceFallbackDescription")}
          </p>
        </div>

        <div className="flex flex-col justify-end gap-3 text-sm text-slate-300">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <span>{t("catalog.priceLabel")}</span>
              <span className="text-right font-semibold text-white">
                {service.price > 0
                  ? formatCurrency(service.price)
                  : t("catalog.priceOnRequest")}
              </span>
            </div>
          </div>
          {leadTime ? (
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <CalendarClock className="h-4 w-4 shrink-0 text-cyan-200" />
              <span className="min-w-0 break-words">{leadTime}</span>
            </div>
          ) : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-white/15 bg-transparent px-4 text-white hover:bg-white/10 hover:text-white"
          >
            <Link
              href={serviceDetailHref}
              aria-label={t("catalog.viewDetailsFor", { title: service.name })}
            >
              {t("catalog.viewDetails")}
            </Link>
          </Button>

          <ServiceBookNowButton
            href={serviceHref}
            serviceName={service.name}
            label={t("catalog.bookNow")}
          />
        </div>
      </div>
    </article>
  );
}

export default CatalogCard;
