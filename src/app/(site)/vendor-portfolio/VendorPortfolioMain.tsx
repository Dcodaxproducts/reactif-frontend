"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Container";
import { PageShell } from "@/components/common/PageShell";
import { VendorServiceCard } from "@/components/cards/ServiceCard";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { MapPin, Star, CheckCircle } from "lucide-react";

export function VendorPortfolio() {
  const { t } = useAppTranslation();
  const services = [
    {
      id: "full-body-stealth-paint-protection-featured",
      category: t("vendorPortfolio.paintProtection"),
      title: t("vendorPortfolio.fullBodyStealth"),
      features: [
        t("vendorPortfolio.selfHealing"),
        t("vendorPortfolio.antiYellowing"),
        t("vendorPortfolio.tenYearWarranty"),
      ],
      price: "125.00",
      popular: true,
    },
    {
      id: "privacy-glass-edition-window-tinting",
      category: t("vendorPortfolio.windowTinting"),
      title: t("vendorPortfolio.privacyGlassEdition"),
      features: [
        t("vendorPortfolio.uvProtection"),
        t("vendorPortfolio.heatReduction"),
        t("vendorPortfolio.lifetimeWarranty"),
      ],
      price: "125.00",
    },
    {
      id: "full-body-stealth-paint-protection-standard",
      category: t("vendorPortfolio.paintProtection"),
      title: t("vendorPortfolio.fullBodyStealth"),
      features: [
        t("vendorPortfolio.selfHealing"),
        t("vendorPortfolio.antiYellowing"),
        t("vendorPortfolio.tenYearWarranty"),
      ],
      price: "125.00",
    },
    {
      id: "full-body-stealth-window-tinting",
      category: t("vendorPortfolio.windowTinting"),
      title: t("vendorPortfolio.fullBodyStealth"),
      features: [
        t("vendorPortfolio.selfHealing"),
        t("vendorPortfolio.antiYellowing"),
        t("vendorPortfolio.tenYearWarranty"),
      ],
      price: "125.00",
    },
  ];
  return (
    <PageShell>
      <Container gutter="xl" className="py-12 md:py-20 flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-pink-400 rounded-full flex items-center justify-center shadow-inner flex-shrink-0">
              <CheckCircle className="text-white" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-100 font-hk">
                  Reactif Studio
                </h2>

                <CheckCircle size={18} className="text-blue-500" />
              </div>

              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-stone-300 mt-1">
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  {t("vendorPortfolio.location")}
                </div>

                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />

                  <span className="text-neutral-50">4.9</span>

                  <span>({t("vendorPortfolio.reviews", { count: 127 })})</span>
                </div>

                <span className="text-emerald-500">{t("designers.available")}</span>
              </div>
            </div>
          </div>

          <Button className="px-5 py-2.5 bg-white rounded-full text-black font-medium w-fit">
            {t("nav.contact")}
          </Button>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="px-4 md:px-5 py-2 bg-pink-400 rounded-full text-white text-sm md:text-base">
            {t("vendorPortfolio.all")}
          </div>

          <div className="px-4 md:px-5 py-2 bg-gray-900 rounded-full border border-stone-500/50 text-stone-300 text-sm md:text-base">
            {t("vendorPortfolio.paintProtection")}
          </div>

          <div className="px-4 md:px-5 py-2 bg-gray-900 rounded-full border border-stone-500/50 text-stone-300 text-sm md:text-base">
            {t("vendorPortfolio.windowTinting")}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 md:gap-10">
          {services.map((service) => {
            const { id, ...serviceCardProps } = service;

            return <VendorServiceCard key={id} {...serviceCardProps} />;
          })}
        </div>
      </Container>
    </PageShell>
  );
}
