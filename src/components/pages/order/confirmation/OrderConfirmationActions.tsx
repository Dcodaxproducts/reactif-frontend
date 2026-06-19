"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function OrderConfirmationActions({
  bookingId,
}: {
  bookingId?: number | string | null;
}) {
  const { t } = useAppTranslation();
  const trackHref = bookingId ? `/order/track/${bookingId}` : "/order/management";
  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div
      data-print-hidden="true"
      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
    >
      <Link
        href={trackHref}
        className="h-12 w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white font-semibold text-base px-8 flex items-center justify-center rounded-[12px]"
      >
        {t("order.trackOrderStatus")}
      </Link>

      <Button
        type="button"
        variant="outline"
        onClick={handlePrintReceipt}
        className="h-12 w-full sm:w-auto bg-transparent border-neutral-50/30 text-white hover:bg-neutral-700 font-semibold text-base px-8"
      >
        {t("order.printReceipt")}
      </Button>
    </div>
  );
}
