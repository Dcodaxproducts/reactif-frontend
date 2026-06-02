"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { CircleDollarSign, Shield } from "lucide-react";

import { protectionFeatures } from "@/data/order";
import { formatCurrency } from "@/lib/currency";
import type { BookingDraft } from "@/types/bookings";
import type { ProtectionFeatureData } from "@/types/component-props";
import { FeatureItem } from "./FeatureItem";

export function WhyProtection({
  draft,
  details = protectionFeatures,
}: {
  draft?: BookingDraft | null;
  details?: ProtectionFeatureData[];
}) {
  const pathname = usePathname();
  const isPortfolioDetailsPage = pathname === "/portfolio-details";
  const serviceName = draft?.selected_service.name ?? "Selected service";
  const serviceDescription =
    draft?.selected_service.description ||
    "Review the service, category, and configuration captured from your selection.";
  const imageSource = draft?.selected_service.image || "/assets/car.png";

  return (
    <div
      className={`w-full max-w-6xl flex flex-col md:flex-row gap-10 p-10 rounded-3xl outline-1 outline-offset-[-1px] ${
        !isPortfolioDetailsPage
          ? "bg-neutral-800/80 outline-neutral-50/30"
          : "border-none outline-none"
      }`}
    >
      <div className="relative w-full md:w-96 h-72 rounded-xl overflow-hidden">
        <Image
          src={imageSource}
          alt={serviceName}
          fill
          sizes="(min-width: 768px) 384px, 100vw"
          className="object-contain md:object-cover"
        />
      </div>

      <div className="flex-1 p-6 rounded-3xl outline-1 outline-offset-[-1px] outline-slate-700 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-white" />
          <h2 className="text-neutral-50 text-base md:text-lg font-bold font-['HK_Grotesk']">
            Selected service
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#F262B5]/30 bg-[#F262B5]/10 px-3 py-1 text-sm font-bold text-neutral-50">
            {serviceName}
          </span>
          {draft?.selected_service.price !== undefined && (
            <span className="inline-flex items-center gap-1 rounded-full border border-neutral-50/10 bg-black/20 px-3 py-1 text-sm font-bold text-neutral-50">
              <CircleDollarSign className="h-4 w-4 text-[#F262B5]" />
              {formatCurrency(draft.selected_service.price)}
            </span>
          )}
        </div>

        <p className="text-neutral-400 text-sm md:text-base font-medium font-['HK_Grotesk']">
          {serviceDescription}
        </p>

        <div className="flex flex-col gap-3">
          {details.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
}
