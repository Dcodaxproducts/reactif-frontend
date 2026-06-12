"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Clock3,
  PackageCheck,
  Settings2,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { StatusCard } from "@/components/common/StatusCard";
import { Button } from "@/components/ui/button";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useCart } from "@/hooks/useCart";
import { activateCartItem, type FrontendCartItem } from "@/lib/cart";
import { formatCurrency } from "@/lib/currency";
import { getImageSource } from "@/lib/image-source";
import type { BookingDraft, BookingFieldResponse } from "@/types/bookings";

const getFieldLabel = (field: BookingFieldResponse) =>
  field.label ?? field.lable ?? field.field_name.replaceAll("_", " ");

const getFieldValue = (field: BookingFieldResponse) => {
  if (field.value === null || field.value === undefined) return "";

  return String(field.value).trim();
};

const getItemTotal = (draft: BookingDraft) =>
  formatCurrency(draft.total_amount || draft.selected_service.price || 0);

const formatCartDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

function CartItemCard({
  item,
  onCheckout,
  onRemove,
}: {
  item: FrontendCartItem;
  onCheckout: (item: FrontendCartItem) => void;
  onRemove: (item: FrontendCartItem) => void;
}) {
  const { t } = useAppTranslation();
  const { draft } = item;
  const imageSource = getImageSource(draft.selected_service.image, "");
  const visibleFields = draft.dynamic_field_responses
    .filter((field) => getFieldValue(field) !== "")
    .slice(0, 4);

  return (
    <article className="grid gap-5 rounded-3xl border border-white/10 bg-neutral-950/70 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl md:grid-cols-[132px_1fr] md:p-5">
      <div className="relative size-32 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 sm:size-36 md:size-[132px]">
        {imageSource ? (
          <Image
            src={imageSource}
            alt={draft.selected_service.name}
            fill
            sizes="180px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-cyan-950 to-fuchsia-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100">
          {draft.selected_category ?? t("cart.service")}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-200/80">
              {t("cart.readyForCheckout")}
            </p>
            <h2 className="mt-2 break-words text-2xl font-semibold text-white">
              {draft.selected_service.name}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
              {draft.selected_service.description || t("cart.descriptionFallback")}
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
            <p className="text-xs font-semibold uppercase text-slate-500">
              {t("cart.estimatedTotal")}
            </p>
            <p className="mt-1 text-xl font-semibold text-white">
              {getItemTotal(draft)}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <PackageCheck className="h-5 w-5 text-cyan-200" aria-hidden="true" />
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
              {t("cart.category")}
            </p>
            <p className="mt-1 break-words text-sm font-semibold text-white">
              {draft.selected_subcategory?.name ??
                draft.selected_category ??
                t("cart.notSelected")}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <Settings2 className="h-5 w-5 text-pink-200" aria-hidden="true" />
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
              {t("cart.configuration")}
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {t("cart.fieldCount", {
                count: draft.dynamic_field_responses.length,
              })}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <Clock3 className="h-5 w-5 text-amber-200" aria-hidden="true" />
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
              {t("cart.updated")}
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {formatCartDate(item.updated_at) || t("cart.justNow")}
            </p>
          </div>
        </div>

        {visibleFields.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {visibleFields.map((field) => (
              <div
                key={`${item.id}-${field.field_name}`}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
              >
                <p className="text-xs font-semibold uppercase text-slate-500">
                  {getFieldLabel(field)}
                </p>
                <p className="mt-1 break-words text-sm text-slate-200">
                  {getFieldValue(field)}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="neutralOutline"
            className="h-11 rounded-full px-5"
            onClick={() => onRemove(item)}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            {t("cart.remove")}
          </Button>
          <Button
            type="button"
            className="h-11 rounded-full bg-white px-5 text-zinc-900 hover:bg-white/90"
            onClick={() => onCheckout(item)}
          >
            {t("cart.continueCheckout")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </article>
  );
}

export function CartPage() {
  const router = useRouter();
  const { t } = useAppTranslation();
  const { items, count, removeItem, clearItems } = useCart();

  const handleCheckout = (item: FrontendCartItem) => {
    activateCartItem(item);
    router.push("/order/address");
  };

  const handleRemove = (item: FrontendCartItem) => {
    removeItem(item.id);
    toast.success(t("cart.removed"));
  };

  const handleClear = () => {
    clearItems();
    toast.success(t("cart.cleared"));
  };

  return (
    <main className="w-full px-4 py-10 sm:px-6 md:py-14">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-neutral-950/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:flex-row md:items-end md:justify-between md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
              {t("cart.eyebrow")}
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
              {t("cart.title")}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
              {t("cart.description")}
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white">
            <ShoppingCart className="h-5 w-5 text-pink-200" aria-hidden="true" />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                {t("cart.items")}
              </p>
              <p className="text-lg font-semibold">
                {t("cart.itemCount", { count })}
              </p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <StatusCard
            tone="empty"
            label={t("common.noDataFound")}
            title={t("cart.emptyTitle")}
            description={t("cart.emptyDescription")}
            action={
              <Button
                asChild
                className="h-11 rounded-full bg-white px-6 text-zinc-900 hover:bg-white/90"
              >
                <Link href="/catalog">{t("cart.browseServices")}</Link>
              </Button>
            }
          />
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-400">
                {t("cart.localNotice")}
              </p>
              <Button
                type="button"
                variant="neutralOutline"
                className="h-10 rounded-full px-5"
                onClick={handleClear}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                {t("cart.clearCart")}
              </Button>
            </div>

            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onCheckout={handleCheckout}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
