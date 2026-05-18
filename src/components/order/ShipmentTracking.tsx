"use client"
import { Button } from "@/components/ui/button"
import { CheckCircle, Store, Truck } from "lucide-react"
import Link from "next/link"

export default function ShipmentTracking() {
  return (
    <section className="w-full flex justify-center px-4 py-10">
      <div
        className="
        w-full
        max-w-5xl
        bg-[#222]
        border border-white/30
        rounded-xl
        p-6 md:p-8
        flex flex-col gap-10
      "
      >

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-semibold text-white font-hk">
            Shipment Tracking
          </h1>

          <p className="text-white/60 text-sm md:text-base">
            Tracking number: 1Z999AA10123456789
          </p>
        </div>

        {/* Status Cards */}
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          gap-4
        "
        >
          <StatusCard title="Current Status" value="In Transit" />
          <StatusCard title="Estimated Delivery" value="July 26, 2024" />
          <StatusCard title="Origin" value="Los Angeles, CA" />
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-6">
          <TimelineItem
            icon={<Store className="w-5 h-5" />}
            title="Shipment Created"
            date="July 20, 2024, 10:00 AM"
          />

          <TimelineItem
            icon={<Truck className="w-5 h-5" />}
            title="Package Picked Up"
            date="July 21, 2024, 2:00 PM"
          />

          <TimelineItem
            icon={<Truck className="w-5 h-5" />}
            title="In Transit"
            date="July 22, 2024, 8:00 AM"
          />

          <TimelineItem
            icon={<CheckCircle className="w-5 h-5" />}
            title="Delivered"
            date="July 26, 2024, 12:00 PM"
            last
          />
        </div>

        {/* Shipment Details */}
        <div className="flex flex-col gap-6">
          <h2 className="text-lg md:text-xl font-semibold text-white">
            Shipment Details
          </h2>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
          >
            <DetailItem title="Tracking Number" value="1Z999AA10123456789" />
            <DetailItem title="Carrier" value="Speedy Delivery" />
            <DetailItem title="Service Type" value="Ground" />
            <DetailItem title="Weight" value="5 lbs" />
            <DetailItem title="Dimensions" value="12x10x8 inches" />
          </div>
        </div>

        {/* Buttons */}
        <div
          className="
          flex
          flex-col
          sm:flex-row
          gap-4
        "
        >
          <Link href="/order/management"
            className="
              h-11
              px-6
              bg-[#E8EDF2]
              text-black
              font-[600]
               flex
    items-center
    justify-center
    rounded-sm
            "
          >
            View Order Details
          </Link>

          <Button
            className="
              h-11
              px-6
              bg-pink-400
              text-white
              font-semibold
            "
          >
            Contact Support
          </Button>
        </div>

      </div>
    </section>
  )
}

///////////////////////////////////////////

function StatusCard({ title, value }: any) {
  return (
    <div
      className="
      bg-[#333]
      rounded-lg
      p-5
      flex flex-col gap-2
    "
    >
      <span className="text-white/60 text-sm">
        {title}
      </span>

      <span className="text-white font-semibold text-lg">
        {value}
      </span>
    </div>
  )
}

///////////////////////////////////////////

function TimelineItem({ icon, title, date, last }: any) {
  return (
    <div className="flex gap-4">
      {/* Icon Column */}
      <div className="flex flex-col items-center">
        <div className="w-5 h-5 flex items-center justify-center text-white">
          {icon}
        </div>

        {!last && (
          <div className="w-[1.6px] flex-1 bg-gray-400 mt-1" />
        )}
      </div>

      {/* Content */}
      <div>
        <div className="text-white font-[600] text-md">
          {title}
        </div>

        <div className="text-white/60 text-sm">
          {date}
        </div>
      </div>
    </div>
  )
}

///////////////////////////////////////////

function DetailItem({ title, value }: any) {
  return (
    <div
      className="
      border-t border-gray-600
      pt-4
      flex flex-col gap-1
    "
    >
      <span className="text-white text-sm font-semibold">
        {title}
      </span>

      <span className="text-white/60 text-sm">
        {value}
      </span>
    </div>
  )
}
