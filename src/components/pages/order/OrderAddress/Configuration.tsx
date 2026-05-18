"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { configurationOptionGroups } from "@/data/order";
import type { OrderConfigurationProps } from "@/types/component-props";
import { Divider } from "./Divider";
import { OptionGroup } from "./OptionGroup";

export default function Configuration({
  buttonText = "Process To Pay",
  backgroundColor = "bg-pink-400",
  basePrice = 123.0,
  finalPrice = 150.0,
  basePriceText = "Gtechhalo",
  basePriceColor = "text-pink-400",
  finalPriceColor = "text-pink-400",
  route,
}: OrderConfigurationProps) {
  const router = useRouter();

  const handleButtonClick = () => {
    if (route) router.push(route);
  };

  return (
    <Card className="w-full max-w-6xl bg-neutral-800/80 border border-neutral-50/30 rounded-3xl backdrop-blur-sm py-0">
      <CardContent className="p-6 md:p-10 flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-2xl font-bold font-hk">
            Configuration
          </h2>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-base font-semibold font-hk">
              4.9
            </span>
            <span className="text-stone-300 text-xs font-medium font-hk">
              (128)
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {configurationOptionGroups.map((group) => (
            <OptionGroup key={group.title} {...group} />
          ))}
        </div>

        <Divider />

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-stone-300 text-xs font-medium font-hk">
              Base Price
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

        <Divider />

        <div className="flex justify-between items-center">
          <span className="text-stone-300 text-xl md:text-2xl font-bold font-hk">
            Total Estimated
          </span>
          <span className="text-stone-300 text-xl md:text-2xl font-bold font-hk">
            ${(basePrice + finalPrice).toFixed(2)}
          </span>
        </div>

        <Button
          className={`w-full h-10 ${backgroundColor} hover:bg-white hover:text-black font-semibold font-hk py-3 rounded-lg text-base md:text-lg shadow-[0px_4px_10px_rgba(210,40,119,0.25)] flex items-center justify-center gap-2`}
          onClick={handleButtonClick}
        >
          {buttonText}
          <ArrowRight className="w-5 h-5" />
        </Button>

        <p className="text-stone-500 text-xs font-bold font-hk text-center">
          No payment required now. The vendor will contact you to confirm
          details.
        </p>
      </CardContent>
    </Card>
  );
}
