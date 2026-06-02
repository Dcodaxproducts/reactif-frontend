"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { configurationOptionGroups } from "@/data/order";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { OrderConfigurationProps } from "@/types/component-props";
import { Divider } from "./Divider";
import { OptionGroup } from "./OptionGroup";

export function Configuration({
  buttonText,
  backgroundColor = "bg-pink-400",
  basePrice = 123.0,
  finalPrice = 150.0,
  basePriceText = "Gtechhalo",
  basePriceColor = "text-pink-400",
  finalPriceColor = "text-pink-400",
  optionGroups = configurationOptionGroups,
  priceRows,
  totalEstimated,
  subtitle,
  showRating = true,
  onBeforeNavigate,
  route,
}: OrderConfigurationProps) {
  const router = useRouter();
  const { t } = useAppTranslation();
  const buttonLabel = buttonText ?? t("order.processToPay");

  const handleButtonClick = () => {
    if (onBeforeNavigate && !onBeforeNavigate()) return;
    if (route) router.push(route);
  };

  return (
    <Card className="w-full max-w-6xl bg-neutral-800/80 border border-neutral-50/30 rounded-3xl backdrop-blur-sm py-0">
      <CardContent className="p-6 md:p-10 flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-white text-2xl font-bold font-hk">
              {t("order.configuration")}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-stone-400 font-hk">
                {subtitle}
              </p>
            )}
          </div>
          {showRating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white text-base font-semibold font-hk">
                4.9
              </span>
              <span className="text-stone-300 text-xs font-medium font-hk">
                (128)
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {optionGroups.map((group) => (
            <OptionGroup key={group.title} {...group} />
          ))}
        </div>

        <Divider />

        {priceRows ? (
          <div className="flex flex-col gap-3">
            {priceRows.map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="text-stone-300 text-sm font-medium font-hk">
                  {label}
                </span>
                <span className="text-neutral-50 text-sm font-semibold font-hk">
                  {value}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="text-stone-300 text-xs font-medium font-hk">
                {t("order.basePrice")}
              </span>
              <span className={`${basePriceColor} text-base font-medium font-hk`}>
                {basePriceText}
              </span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-stone-300 text-xs font-medium font-hk">
                ${basePrice.toFixed(2)}
              </span>
              <span
                className={`${finalPriceColor} text-base font-semibold font-hk`}
              >
                ${finalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        <Divider />

        <div className="flex justify-between items-center">
          <span className="text-stone-300 text-xl md:text-2xl font-bold font-hk">
            {t("order.totalEstimated")}
          </span>
          <span className="text-stone-300 text-xl md:text-2xl font-bold font-hk">
            {totalEstimated ?? `$${(basePrice + finalPrice).toFixed(2)}`}
          </span>
        </div>

        <Button
          className={`w-full h-10 ${backgroundColor} hover:bg-white hover:text-black font-semibold font-hk py-3 rounded-lg text-base md:text-lg shadow-[0px_4px_10px_rgba(210,40,119,0.25)] flex items-center justify-center gap-2`}
          onClick={handleButtonClick}
        >
          {buttonLabel}
          <ArrowRight className="w-5 h-5" />
        </Button>

        <p className="text-stone-500 text-xs font-bold font-hk text-center">
          {t("order.noPaymentRequired")}
        </p>
      </CardContent>
    </Card>
  );
}
