"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useAuth } from "@/hooks/useAuth";
import { useCreateBooking } from "@/hooks/useBookings";
import { usePaymentGateways, useSavePayment } from "@/hooks/usePayments";
import { clearBookingDraft, readBookingDraft } from "@/lib/booking-draft";
import {
  buildBookingFormDataFromDraft,
  getMissingBookingLocationFields,
} from "@/lib/booking-payload";
import { PaymentTab } from "./PaymentTab";

export function PaymentDetailsCard() {
  const router = useRouter();
  const { t } = useAppTranslation();
  const { user, loading: authLoading } = useAuth();
  const { gateways, loading } = usePaymentGateways();
  const createBooking = useCreateBooking();
  const savePayment = useSavePayment();
  const [selectedGatewayId, setSelectedGatewayId] = useState<string | null>(null);
  const draft = typeof window === "undefined" ? null : readBookingDraft();
  const paymentMethods = useMemo(() => {
    if (gateways.length === 0) {
      return [{ id: "pending", label: t("payment.pendingMethod") }];
    }

    return gateways.map((gateway) => ({
      id: String(gateway.id),
      label: gateway.title || gateway.name,
    }));
  }, [gateways, t]);
  const activeGatewayId = selectedGatewayId ?? paymentMethods[0]?.id ?? "pending";
  const activeGateway = gateways.find(
    (gateway) => String(gateway.id) === activeGatewayId,
  );
  const gatewayLoading = loading && gateways.length === 0;
  const activeGatewayConfigured =
    !gatewayLoading && Boolean(activeGateway?.publishableKey);
  const gatewayStatusClass = activeGatewayConfigured
    ? "border-emerald-300/25 bg-emerald-300/10"
    : gatewayLoading
      ? "border-neutral-50/15 bg-neutral-50/5"
      : "border-amber-300/25 bg-amber-300/10";
  const gatewayIconClass = activeGatewayConfigured
    ? "bg-emerald-300/15 text-emerald-200"
    : gatewayLoading
      ? "bg-neutral-50/10 text-neutral-50/70"
      : "bg-amber-300/15 text-amber-200";
  const gatewayStatusTitle = gatewayLoading
    ? t("payment.loading")
    : activeGatewayConfigured
      ? t("payment.onlineCardConfigured")
      : t("payment.onlineCardNotConfigured");
  const gatewayStatusDescription = gatewayLoading
    ? t("payment.loadingPaymentMethods")
    : activeGatewayConfigured
      ? t("payment.onlineCardConfiguredDescription", {
          gateway: activeGateway?.title ?? t("payment.unknown"),
          mode: activeGateway?.isTest
            ? t("payment.testMode")
            : t("payment.liveMode"),
        })
      : t("payment.onlineCardNotConfiguredDescription");
  const paymentSubmitting = createBooking.isPending || savePayment.isPending;
  const amount = draft?.total_amount ?? "0";

  const handlePay = async () => {
    if (!draft) {
      toast.error(t("payment.draftMissing"));
      router.push("/order/management");
      return;
    }

    const missingLocationFields = getMissingBookingLocationFields(draft);
    if (missingLocationFields.length > 0) {
      toast.error(
        t("payment.addMissingLocation", {
          fields: missingLocationFields.join(", "),
        }),
      );
      router.push("/order/address");
      return;
    }

    if (!user) {
      toast.error(t("payment.loginBeforePayment"));
      router.push("/login?redirect=/order/payment");
      return;
    }

    if (!activeGatewayConfigured) {
      toast.error(t("payment.onlineCardNotConfigured"));
      return;
    }

    try {
      const bookingResponse = await createBooking.mutateAsync(
        buildBookingFormDataFromDraft({
          ...draft,
          payment_type: activeGateway?.type || activeGateway?.title || "stripe",
        }),
      );
      const bookingId = bookingResponse.data?.id;

      if (!bookingId) {
        throw new Error("Booking id missing from create booking response");
      }

      await savePayment.mutateAsync({
        user_id: user.userId,
        booking_id: bookingId,
        amount: draft.total_amount,
        transaction_id: `${activeGateway?.type || "stripe"}-${bookingId}-${Date.now()}`,
        payment_type: activeGateway?.type || activeGateway?.title || "stripe",
        payment_method: activeGateway?.title || activeGateway?.name || "Stripe",
        payment_status: activeGateway?.isTest ? "paid" : "pending",
      });

      clearBookingDraft();
      router.push(`/order/success?bookingId=${bookingId}`);
    } catch {
      toast.error(t("payment.couldNotComplete"));
    }
  };

  return (
    <Card className="bg-neutral-800 rounded-3xl border border-neutral-50/30">
      <CardContent className="p-6 md:px-10 md:py-8 flex flex-col gap-6">
        <h2 className="text-neutral-50 text-2xl font-semibold font-['HK_Grotesk']">
          {t("payment.details")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelectedGatewayId(method.id)}
            >
              <PaymentTab
                label={loading ? t("payment.loading") : method.label}
                active={activeGatewayId === method.id}
              />
            </button>
          ))}
        </div>

        <div
          className={`rounded-2xl border p-5 flex flex-col gap-3 ${gatewayStatusClass}`}
        >
          <div className="flex items-start gap-3">
            <span
              className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${gatewayIconClass}`}
            >
              {activeGatewayConfigured ? (
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              ) : (
                <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              )}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-neutral-50 text-lg font-semibold font-['HK_Grotesk']">
                {gatewayStatusTitle}
              </h3>
              <p className="text-neutral-50/70 text-sm md:text-base font-medium font-['HK_Grotesk'] leading-relaxed">
                {gatewayStatusDescription}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePay}
          disabled={authLoading || gatewayLoading || paymentSubmitting}
          className="w-full h-12 bg-pink-400 hover:bg-pink-500 rounded-lg text-neutral-50 text-lg font-semibold font-['HK_Grotesk'] flex items-center justify-center"
        >
          {paymentSubmitting
            ? t("payment.processing")
            : t("payment.payAmount", { amount: `$${amount}` })}
        </button>
        <p className="text-center text-neutral-50/60 text-sm md:text-base font-medium font-['HK_Grotesk']">
          {t("payment.paymentNotStartedNotice")}
        </p>
      </CardContent>
    </Card>
  );
}
