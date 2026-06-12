"use client";

import type { ChangeEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  loadStripe,
  type Stripe,
  type StripeCardElement,
} from "@stripe/stripe-js";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { StatusCard } from "@/components/common/StatusCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import {
  usePaymentGateways,
  useSaveWallet,
  useWalletList,
} from "@/hooks/usePayments";
import { getStoredAuthToken } from "@/lib/auth-token";
import { formatCurrency } from "@/lib/currency";
import type { PaymentGateway } from "@/types/payments";

type PaymentIntentResponse = {
  clientSecret?: string;
  paymentIntentId?: string;
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

const isStripeGateway = (gateway: PaymentGateway) =>
  gateway.type.toLowerCase() === "stripe";

export function Wallet() {
  const { t } = useAppTranslation();
  const { wallets, loading, error } = useWalletList();
  const { gateways, loading: gatewaysLoading } = usePaymentGateways();
  const saveWalletMutation = useSaveWallet();
  const [topUpAmount, setTopUpAmount] = useState("");
  const [stripeReady, setStripeReady] = useState(false);
  const [stripeProcessing, setStripeProcessing] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const stripeRef = useRef<Stripe | null>(null);
  const cardElementRef = useRef<StripeCardElement | null>(null);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const walletBalance = useMemo(
    () =>
      wallets.reduce((total, wallet) => {
        const amount = Number(wallet.amount ?? wallet.balance ?? 0);

        if (!Number.isFinite(amount)) return total;

        return wallet.type === "debit" ? total - amount : total + amount;
      }, 0),
    [wallets],
  );
  const activeGateway = useMemo(
    () =>
      gateways.find(
        (gateway) => isStripeGateway(gateway) && Boolean(gateway.publishableKey),
      ) ??
      gateways.find((gateway) => Boolean(gateway.publishableKey)) ??
      null,
    [gateways],
  );
  const activeGatewayConfigured =
    !gatewaysLoading && Boolean(activeGateway?.publishableKey);
  const gatewayStatusClass = activeGatewayConfigured
    ? "border-emerald-300/25 bg-emerald-300/10"
    : gatewaysLoading
      ? "border-neutral-50/15 bg-neutral-50/5"
      : "border-amber-300/25 bg-amber-300/10";
  const gatewayIconClass = activeGatewayConfigured
    ? "bg-emerald-300/15 text-emerald-200"
    : gatewaysLoading
      ? "bg-neutral-50/10 text-neutral-50/70"
      : "bg-amber-300/15 text-amber-200";
  const gatewayStatusTitle = gatewaysLoading
    ? t("payment.loading")
    : activeGatewayConfigured
      ? t("payment.onlineCardConfigured")
      : t("payment.onlineCardNotConfigured");
  const gatewayStatusDescription = gatewaysLoading
    ? t("payment.loadingPaymentMethods")
    : activeGatewayConfigured
      ? t("payment.onlineCardConfiguredDescription", {
          gateway: activeGateway?.title ?? t("payment.unknown"),
          mode: activeGateway?.isTest
            ? t("payment.testMode")
            : t("payment.liveMode"),
        })
      : t("payment.onlineCardNotConfiguredDescription");
  const topUpProcessing = stripeProcessing || saveWalletMutation.isPending;

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

  const handleTopUpWallet = async () => {
    const amount = Number(topUpAmount);

    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error(t("wallet.validAmount"));
      return;
    }

    if (!activeGatewayConfigured || !activeGateway) {
      toast.error(t("payment.onlineCardNotConfigured"));
      return;
    }

    const authToken = getStoredAuthToken();
    const stripe = stripeRef.current;
    const cardElement = cardElementRef.current;

    if (!authToken) {
      toast.error(t("wallet.loginBeforeTopUp"));
      return;
    }

    if (!stripe || !cardElement || !stripeReady) {
      toast.error(t("payment.stripeCouldNotLoad"));
      return;
    }

    setStripeProcessing(true);

    try {
      const paymentIntent = await createPaymentIntent({
        amount: String(amount),
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

      await saveWalletMutation.mutateAsync({
        amount,
        type: "credit",
        gateway_id: activeGateway.id,
        payment_method: activeGateway.title || activeGateway.name || "Stripe",
        token: transactionId,
        title: t("wallet.topUpTitle"),
      });
      setTopUpAmount("");
      cardElement.clear();
    } catch {
      toast.error(t("payment.couldNotComplete"));
    } finally {
      setStripeProcessing(false);
    }
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTopUpAmount(event.target.value);
  };

  return (
    <section className="w-full flex justify-center px-4 py-10">
      <Card className="w-full max-w-5xl bg-neutral-800 rounded-3xl border border-neutral-50/30">
        <CardContent className="p-6 md:p-10 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-neutral-50 text-3xl font-semibold font-hk">
                {t("wallet.title")}
              </h1>
              <p className="text-neutral-50/60">
                {t("wallet.description")}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-50/10 bg-neutral-900/60 px-5 py-4">
              <p className="text-neutral-50/50 text-xs font-semibold uppercase">
                {t("wallet.currentBalance")}
              </p>
              <p className="mt-1 text-pink-400 text-2xl font-semibold">
                {formatCurrency(walletBalance)}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-50/10 bg-neutral-900/50 p-4 md:p-5 flex flex-col gap-5">
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
                  <h2 className="text-neutral-50 text-lg font-semibold">
                    {gatewayStatusTitle}
                  </h2>
                  <p className="text-neutral-50/70 text-sm md:text-base leading-relaxed">
                    {gatewayStatusDescription}
                  </p>
                </div>
              </div>
            </div>

            {activeGatewayConfigured && (
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="wallet-stripe-card-element"
                  className="text-neutral-50 text-base font-semibold"
                >
                  {t("payment.cardDetails")}
                </label>
                <div
                  id="wallet-stripe-card-element"
                  ref={cardContainerRef}
                  className="min-h-12 rounded-lg border border-neutral-50/15 bg-neutral-950/40 px-4 py-3"
                />
                {cardError && (
                  <p className="text-sm font-medium text-rose-300">{cardError}</p>
                )}
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-3 md:items-end">
              <label className="flex-1 flex flex-col gap-2">
                <span className="text-neutral-50/70 text-sm font-semibold">
                  {t("wallet.topUpAmount")}
                </span>
                <Input
                  type="number"
                  min="1"
                  step="0.01"
                  value={topUpAmount}
                  onChange={handleAmountChange}
                  placeholder={t("wallet.enterAmount")}
                  className="text-neutral-50 border-neutral-50/20"
                />
              </label>

              <Button
                type="button"
                onClick={handleTopUpWallet}
                disabled={
                  gatewaysLoading ||
                  topUpProcessing ||
                  (activeGatewayConfigured && !stripeReady)
                }
                className="h-[52px] px-6"
              >
                {topUpProcessing ? t("wallet.adding") : t("wallet.topUpWallet")}
              </Button>
            </div>
            <p className="text-neutral-50/60 text-sm">
              {t("wallet.paymentNotice")}
            </p>
          </div>

          {loading && (
            <StatusCard
              tone="loading"
              title={t("wallet.loading")}
              className="p-6"
            />
          )}
          {error && (
            <StatusCard
              tone="error"
              label={t("common.backendError")}
              title={error}
              className="p-6"
            />
          )}
          {!loading && wallets.length === 0 && (
            <StatusCard
              tone="empty"
              label={t("common.noDataFound")}
              title={t("wallet.noActivity")}
              className="p-6"
            />
          )}
          {wallets.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-neutral-50 text-xl font-semibold font-hk">
                {t("wallet.activity")}
              </h2>
              {wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-neutral-50/10 pt-4 text-neutral-50/70"
                >
                  <span>{wallet.title ?? t("wallet.entry", { id: wallet.id })}</span>
                  <span className="capitalize">{wallet.type ?? t("wallet.credit")}</span>
                  <span className="font-semibold text-neutral-50">
                    {formatCurrency(wallet.amount ?? wallet.balance ?? 0)}
                  </span>
                  <span>{String(wallet.status ?? t("wallet.active"))}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
