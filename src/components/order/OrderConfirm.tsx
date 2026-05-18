"use client"

import React from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OrderConfirm() {
  return (
    <section className="w-full flex justify-center px-4 py-10">
      {/* Container */}
      <div className="
        w-full
        max-w-5xl
        p-6 sm:p-8 md:p-10
        bg-neutral-800/80
        rounded-3xl
        border border-neutral-50/10
        flex flex-col gap-10
      ">

        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <div className="p-4 bg-green-600/10 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold text-neutral-50 font-hk">
            Thank You! Your Order is Confirmed
          </h1>

          <p className="max-w-2xl text-neutral-50/60 text-sm sm:text-base md:text-xl font-medium font-hk">
            Your order #123-4567890 has been placed. A confirmation email has been sent to your registered email address.
          </p>
        </div>

        {/* Summary Card */}
        <div className="
          w-full
          p-6 sm:p-8 md:p-10
          bg-neutral-800
          rounded-3xl
          border border-neutral-50/10
          flex flex-col gap-8
        ">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-neutral-50 font-hk">
            Order Summary
          </h2>

          {/* Order Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <InfoItem title="Order Number" value="123-4567890" />
            <InfoItem title="Order Date" value="October 26, 2023" />
            <InfoItem title="Payment Method" value="Visa ending in 1234" />
          </div>

          <InfoItem
            title="Shipping Address"
            value="123 Main Street, Anytown, USA 12345"
          />

          {/* Items Table */}
          <div className="border border-neutral-50/10 rounded-xl overflow-hidden">

            {/* Header */}
            <div className="
              hidden md:grid
              grid-cols-3
              items-center
              px-4 py-4
              text-neutral-50
              font-medium
              bg-neutral-700/40
            ">
              <div>Item</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Price</div>
            </div>

            {/* Items */}
            <OrderItem name="Premium Ergonomic Chair" qty="1" price="$499.00" />
            <OrderItem name="Adjustable Standing Desk" qty="1" price="$499.00" />
            <OrderItem name="Wireless Mechanical Keyboard" qty="1" price="$499.00" />
          </div>

          {/* Totals */}
          <div className="w-full md:max-w-sm ml-auto flex flex-col gap-4">
            <TotalItem title="Subtotal" value="$969.50" />
            <TotalItem title="Shipping" value="$25.00" />
            <TotalItem title="Taxes" value="$78.76" />

            <div className="border-t border-neutral-50/10 pt-4 flex justify-between font-semibold text-neutral-50">
              <span>Total</span>
              <span>$1,073.26</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="
          flex
          flex-col
          sm:flex-row
          gap-4
          justify-center
          items-center
        ">
          <Link href="/order/track" className="
            h-12
            w-full sm:w-auto
            bg-pink-500
            hover:bg-pink-600
            text-white
            font-semibold
            text-base
            px-8
            flex
    items-center
    justify-center
            rounded-[12px]
          ">
            Track Order Status
          </Link>

          <Button
            variant="outline"
            className="
              h-12
              w-full sm:w-auto
              bg-transparent
              border-neutral-50/30
              text-white
              hover:bg-neutral-700
              font-semibold
              text-base
              px-8
            "
          >
            Print Receipt
          </Button>
        </div>

      </div>
    </section>
  )
}

/* Reusable Components */

function InfoItem({ title, value }: any) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-neutral-50 font-semibold">
        {title}
      </span>
      <span className="text-neutral-50/60">
        {value}
      </span>
    </div>
  )
}

function OrderItem({ name, qty, price }: any) {
  return (
    <div className="
      grid
      grid-cols-1
      md:grid-cols-3
      items-center
      px-4 py-4
      border-t border-neutral-50/10
      text-neutral-50/60
      gap-2
    ">
      <span>{name}</span>

      <span className="md:text-center">
        Qty: {qty}
      </span>

      <span className="md:text-right">
        {price}
      </span>
    </div>
  )
}

function TotalItem({ title, value }: any) {
  return (
    <div className="flex justify-between text-neutral-50/60">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  )
}
