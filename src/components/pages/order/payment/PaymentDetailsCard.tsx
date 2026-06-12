"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  loadStripe,
  type Stripe,
  type StripeCardElement,
} from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useAuth } from "@/hooks/useAuth";
import { usePaymentGateways } from "@/hooks/usePayments";
import { clearBookingDraft, readBookingDraft } from "@/lib/booking-draft";
import {
  clearActiveCartItemId,
  readActiveCartItemId,
  removeCartItem,
} from "@/lib/cart";
import { getStoredAuthToken } from "@/lib/auth-token";
import {
  buildBookingFormDataFromDraft,
  getMissingBookingLocationFields,
} from "@/lib/booking-payload";
import { createBooking as createBookingRequest } from "@/services/bookings";
import { savePayment as savePaymentRequest } from "@/services/payments";
import { PaymentTab } from "./PaymentTab";

type PaymentIntentResponse = {
  clientSecret?: string;
  paymentIntentId?: string;
  publishableKey?: string;
  message?: string;
};

const createPaymentIntent = async ({
  amount,
  token,
}: {
  amount: string;
  token: string;
}): Promise<PaymentIntentResponse> => {
  const response = await fetch("/api/stripe/payment-intent", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency: "chf",
    }),
  });
  const data = (await response.json()) as PaymentIntentResponse;

  if (!response.ok) {
    throw new Error(data.message || "Stripe payment could not be started");
  }

  return data;
};

const getPaymentIntentIdFromClientSecret = (clientSecret: string) => {
  const secretMarkerIndex = clientSecret.indexOf("_secret_");

  return secretMarkerIndex > 0
    ? clientSecret.substring(0, secretMarkerIndex)
    : "";
};

export function PaymentDetailsCard() {
  const router = useRouter();
  const { t } = useAppTranslation();
  const { user, loading: authLoading } = useAuth();
  const { gateways, loading } = usePaymentGateways();
  const [selectedGatewayId, setSelectedGatewayId] = useState<string | null>(null);
  const [stripeReady, setStripeReady] = useState(false);
  const [stripeProcessing, setStripeProcessing] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const stripeRef = useRef<Stripe | null>(null);
  const cardElementRef = useRef<StripeCardElement | null>(null);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
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
  const paymentSubmitting = stripeProcessing;
  const amount = draft?.total_amount ?? "0";

  useEffect(() => {
    const publishableKey = activeGateway?.publishableKey;

    cardElementRef.current?.destroy();
    cardElementRef.current = null;
    stripeRef.current = null;
    setStripeReady(false);
    setCardError(null);

    if (!activeGatewayConfigured || !publishableKey || !cardContainerRef.current) {
      return;
    }

    let effectActive = true;

    loadStripe(publishableKey)
      .then((stripe) => {
        if (!effectActive || !stripe || !cardContainerRef.current) {
          return;
        }

        const elements = stripe.elements();
        const cardElement = elements.create("card", {
          style: {
            base: {
              color: "#f5f5f5",
              fontFamily: "HK Grotesk, system-ui, sans-serif",
              fontSize: "16px",
              "::placeholder": {
                color: "rgba(245, 245, 245, 0.55)",
              },
            },
            invalid: {
              color: "#fb7185",
            },
          },
        });

        cardElement.on("change", (event) => {
          setCardError(event.error?.message ?? null);
        });
        cardElement.mount(cardContainerRef.current);
        stripeRef.current = stripe;
        cardElementRef.current = cardElement;
        setStripeReady(true);
      })
      .catch(() => {
        setCardError(t("payment.stripeCouldNotLoad"));
      });

    return () => {
      effectActive = false;
      cardElementRef.current?.destroy();
      cardElementRef.current = null;
      stripeRef.current = null;
    };
  }, [activeGateway?.publishableKey, activeGatewayConfigured, t]);

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

    const authToken = getStoredAuthToken();
    const stripe = stripeRef.current;
    const cardElement = cardElementRef.current;

    if (!authToken || !stripe || !cardElement || !stripeReady) {
      toast.error(t("payment.stripeCouldNotLoad"));
      return;
    }

    setStripeProcessing(true);

    try {
      const bookingResponse = await createBookingRequest(
        buildBookingFormDataFromDraft({
          ...draft,
          payment_type: activeGateway?.type || activeGateway?.title || "stripe",
        }),
      );
      const bookingId = bookingResponse.data?.id;

      if (!bookingId) {
        throw new Error("Booking id missing from create booking response");
      }

      const paymentIntent = await createPaymentIntent({
        amount: draft.total_amount,
        token: authToken,
      });

      if (!paymentIntent.clientSecret) {
        throw new Error("Stripe client secret missing");
      }

      const confirmation = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        },
      );

      if (confirmation.error) {
        setCardError(confirmation.error.message ?? t("payment.couldNotComplete"));
        return;
      }

      if (confirmation.paymentIntent?.status !== "succeeded") {
        toast.error(t("payment.couldNotComplete"));
        return;
      }

      const transactionId =
        confirmation.paymentIntent.id ||
        paymentIntent.paymentIntentId ||
        getPaymentIntentIdFromClientSecret(paymentIntent.clientSecret);

      if (!transactionId) {
        throw new Error("Stripe transaction id missing");
      }

      await savePaymentRequest({
        user_id: user.userId,
        booking_id: bookingId,
        amount: draft.total_amount,
        transaction_id: transactionId,
        payment_type: activeGateway?.type || activeGateway?.title || "stripe",
        payment_method: activeGateway?.title || activeGateway?.name || "Stripe",
        payment_status: "paid",
      });

      removeCartItem(readActiveCartItemId());
      clearActiveCartItemId();
      clearBookingDraft();
      router.push(`/order/success?bookingId=${bookingId}`);
    } catch {
      toast.error(t("payment.couldNotComplete"));
    } finally {
      setStripeProcessing(false);
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

        {activeGatewayConfigured && (
          <div className="rounded-2xl border border-neutral-50/10 bg-neutral-900/50 p-5 flex flex-col gap-3">
            <label
              htmlFor="stripe-card-element"
              className="text-neutral-50 text-base font-semibold font-['HK_Grotesk']"
            >
              {t("payment.cardDetails")}
            </label>
            <div
              id="stripe-card-element"
              ref={cardContainerRef}
              className="min-h-12 rounded-lg border border-neutral-50/15 bg-neutral-950/40 px-4 py-3"
            />
            {cardError && (
              <p className="text-sm font-medium text-rose-300">{cardError}</p>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={handlePay}
          disabled={
            authLoading ||
            gatewayLoading ||
            paymentSubmitting ||
            (activeGatewayConfigured && !stripeReady)
          }
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
