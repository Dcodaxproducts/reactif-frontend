import Image from "next/image";
import { CheckCircle2, CircleDollarSign, ListChecks } from "lucide-react";

import {
  PAINT_PROTECTION_FALLBACK_IMAGE,
  getImageSource,
} from "@/lib/image-source";
import { formatCurrency } from "@/lib/currency";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/component-props";

export function ServiceSelector({
  services,
  selectedServiceId,
  onSelect,
}: {
  services: Service[];
  selectedServiceId: string | null;
  onSelect: (serviceId: string) => void;
}) {
  const { t } = useAppTranslation();

  if (services.length <= 1) return null;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-neutral-50 text-sm font-bold">
            {t("bookingFlow.chooseService")}
          </div>
          <div className="text-neutral-500 text-xs">
            {t("bookingFlow.optionCount", { count: services.length })}
          </div>
        </div>
      </div>

      <div className="grid gap-3" role="listbox" aria-label="Service options">
        {services.map((service, index) => {
          const { id, name, description, price, fields, service_image } =
            service;
          const serviceId = id.toString();
          const isSelected = selectedServiceId === serviceId;
          const fieldCount = fields.length;
          const imageSource = getImageSource(
            service_image,
            PAINT_PROTECTION_FALLBACK_IMAGE,
          );

          return (
            <button
              key={id}
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => onSelect(serviceId)}
              className={cn(
                "w-full rounded-xl border p-3 text-left transition duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F262B5]",
                isSelected
                  ? "border-[#F262B5] bg-[#F262B5]/10 shadow-[0_0_0_1px_rgba(242,98,181,0.25)]"
                  : "border-slate-800 bg-neutral-950/60 hover:border-slate-600 hover:bg-neutral-900/70",
              )}
            >
              <div className="flex gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
                  <Image
                    src={imageSource}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-500">
                        {t("bookingFlow.optionLabel", { number: index + 1 })}
                      </div>
                      <div className="truncate text-sm font-bold text-neutral-50">
                        {name}
                      </div>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#F262B5]" />
                    )}
                  </div>

                  {description && (
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-400">
                      {description}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-neutral-300">
                    <span className="inline-flex items-center gap-1 rounded-md border border-slate-800 bg-black/20 px-2 py-1">
                      <CircleDollarSign className="h-3.5 w-3.5 text-[#F262B5]" />
                      {formatCurrency(price)}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-slate-800 bg-black/20 px-2 py-1">
                      <ListChecks className="h-3.5 w-3.5 text-[#F262B5]" />
                      {t("bookingFlow.fieldCount", { count: fieldCount })}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
