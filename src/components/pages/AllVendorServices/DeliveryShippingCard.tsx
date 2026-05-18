import { Truck } from "lucide-react";

import { deliveryCarriers } from "@/data/all-vendor-services";
import CarrierBadge from "./CarrierBadge";

export default function DeliveryShippingCard() {
  return (
    <div className="w-full p-6 sm:p-8 md:p-10 rounded-xl border border-stone-500/50 flex flex-col items-center gap-5 md:gap-6 text-center">
      <div className="flex items-center gap-3 text-lg sm:text-xl md:text-2xl font-bold text-white">
        <Truck className="text-indigo-400" size={24} />
        Nationwide Shipping
      </div>

      <p className="text-stone-300 text-sm sm:text-base max-w-[700px]">
        We ship orders through reputable Swiss carriers to ensure fast and
        reliable delivery throughout the country.
      </p>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 mt-3 md:mt-4">
        {deliveryCarriers.map((carrier) => (
          <CarrierBadge key={carrier} carrier={carrier} />
        ))}
      </div>
    </div>
  );
}
