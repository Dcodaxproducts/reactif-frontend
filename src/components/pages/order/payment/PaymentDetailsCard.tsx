"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useAuth } from "@/hooks/useAuth";
import { usePaymentGateways } from "@/hooks/usePayments";
import { readBookingDraft } from "@/lib/booking-draft";
import { getMissingBookingLocationFields } from "@/lib/booking-payload";
import { PaymentTab } from "./PaymentTab";

export function PaymentDetailsCard() {
  const router = useRouter();
  const { t } = useAppTranslation();
  const { user, loading: authLoading } = useAuth();
  const { gateways, loading } = usePaymentGateways();
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

    toast.error(t("payment.onlineCardNotConfigured"));
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

        <div className="rounded-2xl border border-amber-300/25 bg-amber-300/10 p-5 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-300/15 text-amber-200">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-neutral-50 text-lg font-semibold font-['HK_Grotesk']">
                {t("payment.onlineCardNotConfigured")}
              </h3>
              <p className="text-neutral-50/70 text-sm md:text-base font-medium font-['HK_Grotesk'] leading-relaxed">
                {t("payment.onlineCardNotConfiguredDescription")}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePay}
          disabled={authLoading}
          className="w-full h-12 bg-pink-400 hover:bg-pink-500 rounded-lg text-neutral-50 text-lg font-semibold font-['HK_Grotesk'] flex items-center justify-center"
        >
          {t("payment.payAmount", { amount: `$${amount}` })}
        </button>
        <p className="text-center text-neutral-50/60 text-sm md:text-base font-medium font-['HK_Grotesk']">
          {t("payment.paymentNotStartedNotice")}
        </p>
      </CardContent>
    </Card>
  );
}
