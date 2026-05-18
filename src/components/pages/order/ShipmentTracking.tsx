import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  shipmentDetails,
  shipmentStatuses,
  shipmentTimeline,
} from "@/data/order";
import { DetailItem } from "./tracking/DetailItem";
import { StatusCard } from "./tracking/StatusCard";
import { TimelineItem } from "./tracking/TimelineItem";

export default function ShipmentTracking() {
  return (
    <section className="w-full flex justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-[#222] border border-white/30 rounded-xl p-6 md:p-8 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-semibold text-white font-hk">
            Shipment Tracking
          </h1>
          <p className="text-white/60 text-sm md:text-base">
            Tracking number: 1Z999AA10123456789
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {shipmentStatuses.map((status) => (
            <StatusCard key={status.title} {...status} />
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {shipmentTimeline.map((item) => (
            <TimelineItem key={item.title} {...item} />
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-lg md:text-xl font-semibold text-white">
            Shipment Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shipmentDetails.map((detail) => (
              <DetailItem key={detail.title} {...detail} />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/order/management"
            className="h-11 px-6 bg-[#E8EDF2] text-black font-[600] flex items-center justify-center rounded-sm"
          >
            View Order Details
          </Link>

          <Button className="h-11 px-6 bg-pink-400 text-white font-semibold">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
}
