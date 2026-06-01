"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function OrderConfirmationActions() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const trackHref = bookingId ? `/order/track/${bookingId}` : "/order/management";

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link
        href={trackHref}
        className="h-12 w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white font-semibold text-base px-8 flex items-center justify-center rounded-[12px]"
      >
        Track Order Status
      </Link>

      <Button
        variant="outline"
        className="h-12 w-full sm:w-auto bg-transparent border-neutral-50/30 text-white hover:bg-neutral-700 font-semibold text-base px-8"
      >
        Print Receipt
      </Button>
    </div>
  );
}
