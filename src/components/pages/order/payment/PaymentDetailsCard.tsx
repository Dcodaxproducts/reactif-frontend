"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { paymentFields, paymentSecondaryFields } from "@/data/order";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useAuth } from "@/hooks/useAuth";
import { useCreateBooking } from "@/hooks/useBookings";
import { usePaymentGateways, useSavePayment } from "@/hooks/usePayments";
import { clearBookingDraft, readBookingDraft } from "@/lib/booking-draft";
import {
  buildBookingFormDataFromDraft,
  getMissingBookingLocationFields,
} from "@/lib/booking-payload";
import { PaymentInputField } from "./PaymentInputField";
import { PaymentTab } from "./PaymentTab";

export function PaymentDetailsCard() {
  const router = useRouter();
  const { t } = useAppTranslation();
  const { user, loading: authLoading } = useAuth();
  const { gateways, loading } = usePaymentGateways();
  const createBookingMutation = useCreateBooking();
  const savePaymentMutation = useSavePayment();
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

    try {
      const bookingResponse = await createBookingMutation.mutateAsync(
        buildBookingFormDataFromDraft(draft),
      );
      const bookingId = bookingResponse.data?.id ?? draft.selected_service.id;
      await savePaymentMutation.mutateAsync({
        user_id: user.userId,
        booking_id: bookingId,
        amount,
        transaction_id: `SIM-${Date.now()}`,
        payment_type: draft.payment_type,
        payment_method: activeGatewayId,
        payment_status: "confirmed",
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

        <div className="flex flex-col gap-4">
          {paymentFields.map((field) => (
            <PaymentInputField
              key={field.label}
              {...field}
              label={field.labelKey ? t(field.labelKey) : field.label}
              placeholder={
                field.placeholderKey ? t(field.placeholderKey) : field.placeholder
              }
            />
          ))}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paymentSecondaryFields.map((field) => (
              <PaymentInputField
                key={field.label}
                {...field}
                label={field.labelKey ? t(field.labelKey) : field.label}
                placeholder={
                  field.placeholderKey ? t(field.placeholderKey) : field.placeholder
                }
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handlePay}
          disabled={
            authLoading ||
            createBookingMutation.isPending ||
            savePaymentMutation.isPending
          }
          className="w-full h-12 bg-pink-400 hover:bg-pink-500 rounded-lg text-neutral-50 text-lg font-semibold font-['HK_Grotesk'] flex items-center justify-center"
        >
          {t("payment.payAmount", { amount: `$${amount}` })}
        </button>
        <p className="text-center text-neutral-50/60 text-sm md:text-base font-medium font-['HK_Grotesk']">
          {t("payment.confirmationNotice")}
        </p>
      </CardContent>
    </Card>
  );
}
