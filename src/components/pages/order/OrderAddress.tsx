"use client";

import { useEffect, useMemo, useState } from "react";

import { readBookingDraft } from "@/lib/booking-draft";
import {
  buildOrderDetailItems,
  buildOrderFieldGroups,
  buildOrderPriceRows,
  buildPersonalInfoFields,
  getOrderTotalLabel,
} from "@/lib/order-address-summary";
import type { BookingDraft } from "@/types/bookings";
import { PersonalInfo } from "./OrderAddress/PersonalInfo";
import { Configuration } from "./OrderAddress/Configuration";
import { WhyProtection } from "./OrderAddress/WhyProtection";

export function OrderAddress() {
  const [draft, setDraft] = useState<BookingDraft | null>(null);

  useEffect(() => {
    setDraft(readBookingDraft());
  }, []);

  const fieldGroups = useMemo(() => buildOrderFieldGroups(draft), [draft]);
  const detailItems = useMemo(() => buildOrderDetailItems(draft), [draft]);
  const priceRows = useMemo(() => buildOrderPriceRows(draft), [draft]);
  const personalFields = useMemo(() => buildPersonalInfoFields(draft), [draft]);
  const totalEstimated = useMemo(() => getOrderTotalLabel(draft), [draft]);
  const configurationSubtitle = draft
    ? `${draft.selected_service.name} · ${
        draft.selected_subcategory?.name ?? draft.selected_category ?? "Selected category"
      }`
    : "Select a service first to see dynamic configuration details.";

  return (
    <section className="w-full flex flex-col items-center gap-10 py-8 px-5 md:px-0">
      <PersonalInfo fields={personalFields} />
      <WhyProtection draft={draft} details={detailItems} />
      <Configuration
        route="/order/payment"
        optionGroups={fieldGroups}
        priceRows={priceRows}
        totalEstimated={totalEstimated}
        subtitle={configurationSubtitle}
        showRating={false}
      />
    </section>
  );
}
