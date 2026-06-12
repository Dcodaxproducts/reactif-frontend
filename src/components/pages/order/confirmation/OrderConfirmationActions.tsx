"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function OrderConfirmationActions({
  bookingId,
}: {
  bookingId?: number | string | null;
}) {
  const { t } = useAppTranslation();
  const trackHref = bookingId ? `/order/track/${bookingId}` : "/order/management";
  const chatHref = bookingId ? `/messages/${bookingId}` : "/messages";
  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link
        href={trackHref}
        className="h-12 w-full sm:w-auto bg-cyan-300 hover:bg-cyan-200 text-neutral-950 font-semibold text-base px-8 flex items-center justify-center rounded-[12px]"
      >
        {t("order.trackOrderStatus")}
      </Link>

      <Link
        href={chatHref}
        className="h-12 w-full sm:w-auto border border-neutral-50/20 bg-neutral-50/10 text-white hover:bg-neutral-50/15 font-semibold text-base px-8 flex items-center justify-center gap-2 rounded-[12px]"
      >
        <MessageCircle className="size-4" />
        {t("messages.startChat")}
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
