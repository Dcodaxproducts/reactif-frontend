"use client";

import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type { StripeCardElementOptions } from "@stripe/stripe-js";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Loader2,
  ReceiptText,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import {
  usePaymentGateways,
  useSaveWallet,
  useWalletList,
} from "@/hooks/usePayments";
import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import type { PaymentGateway } from "@/types/payments";

const cardElementOptions: StripeCardElementOptions = {
  hidePostalCode: false,
  style: {
    base: {
      color: "#f8fafc",
      fontFamily: "HK Grotesk, Inter, system-ui, sans-serif",
      fontSize: "16px",
      "::placeholder": {
        color: "rgba(248, 250, 252, 0.42)",
      },
    },
    invalid: {
      color: "#fb7185",
      iconColor: "#fb7185",
    },
  },
};

type PaymentIntentResponse = {
  clientSecret?: string;
  paymentIntentId?: string;
  error?: string;
};

const getGatewayPublishableKey = (gateway?: PaymentGateway | null) =>
  gateway?.publishableKey ??
  gateway?.publishable_key ??
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
  "";

const getGatewayLabel = (gateway?: PaymentGateway | null) =>
  gateway?.title || gateway?.name || "Stripe";

export function Wallet() {
  const { t } = useAppTranslation();
  const { wallets, loading, error } = useWalletList();
  const { gateways, loading: gatewaysLoading } = usePaymentGateways();
  const [topUpAmount, setTopUpAmount] = useState("");
  const walletBalance = useMemo(
    () =>
      wallets.reduce((total, wallet) => {
        const amount = Number(wallet.amount ?? wallet.balance ?? 0);

        if (!Number.isFinite(amount)) return total;

        return wallet.type === "debit" ? total - amount : total + amount;
      }, 0),
    [wallets],
  );
  const stripeGateway =
    gateways.find((gateway) =>
      `${gateway.name} ${gateway.title} ${gateway.type}`
        .toLowerCase()
        .includes("stripe"),
    ) ?? gateways[0];
  const publishableKey = getGatewayPublishableKey(stripeGateway);
  const stripePromise = useMemo(
    () => (publishableKey ? loadStripe(publishableKey) : null),
    [publishableKey],
  );

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTopUpAmount(event.target.value);
  };

  const clearAmount = () => {
    setTopUpAmount("");
  };

  return (
    <section className="w-full px-4 py-8 sm:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,#101820_0%,#171717_46%,#0f2f32_100%)] shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
            <div className="flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-4">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
                  <WalletCards className="size-4" />
                  {t("wallet.secureWallet")}
                </div>
                <div className="max-w-2xl">
                  <h1 className="font-hk text-3xl font-semibold text-neutral-50 sm:text-4xl">
                    {t("wallet.title")}
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-neutral-50/68 sm:text-base">
                    {t("wallet.description")}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <WalletStat
                  label={t("wallet.currentBalance")}
                  value={formatCurrency(walletBalance)}
                  icon={<WalletCards className="size-5" />}
                />
                <WalletStat
                  label={t("wallet.activity")}
                  value={String(wallets.length)}
                  icon={<ReceiptText className="size-5" />}
                />
                <WalletStat
                  label={t("wallet.protectedByStripe")}
                  value={t("wallet.cardSecured")}
                  icon={<ShieldCheck className="size-5" />}
                />
              </div>
            </div>

            <Card className="border-white/12 bg-white/[0.06] shadow-none backdrop-blur">
              <CardContent className="flex flex-col gap-5 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-50/50">
                      {t("wallet.topUpAmount")}
                    </p>
                    <h2 className="mt-2 font-hk text-xl font-semibold text-neutral-50">
                      {t("wallet.cardTopUp")}
                    </h2>
                  </div>
                  <span className="rounded-2xl border border-white/10 bg-neutral-950/40 p-3 text-cyan-100">
                    <CreditCard className="size-5" />
                  </span>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-neutral-50/72">
                    {t("wallet.amountToAdd")}
                  </span>
                  <Input
                    type="number"
                    min="1"
                    step="0.01"
                    value={topUpAmount}
                    onChange={handleAmountChange}
                    placeholder={t("wallet.enterAmount")}
                    className="border-white/10 bg-neutral-950/40 text-neutral-50 focus-visible:border-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-300/20"
                  />
                </label>

                {!publishableKey && !gatewaysLoading && (
                  <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50">
                    {t("wallet.stripeUnavailable")}
                  </div>
                )}

                {stripePromise && (
                  <Elements stripe={stripePromise}>
                    <WalletTopUpForm
                      amount={topUpAmount}
                      gateway={stripeGateway}
                      onSuccess={clearAmount}
                    />
                  </Elements>
                )}

                {gatewaysLoading && (
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-neutral-950/40 p-4 text-sm text-neutral-50/60">
                    <Loader2 className="size-4 animate-spin" />
                    {t("wallet.loadingGateway")}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="overflow-hidden rounded-[24px] border border-neutral-50/10 bg-neutral-900/80">
          <CardContent className="p-0">
            <div className="flex items-center justify-between gap-4 border-b border-neutral-50/10 p-5 sm:p-6">
              <div>
                <h2 className="font-hk text-xl font-semibold text-neutral-50">
                  {t("wallet.activity")}
                </h2>
                <p className="mt-1 text-sm text-neutral-50/52">
                  {t("wallet.activityDescription")}
                </p>
              </div>
              <ReceiptText className="hidden size-5 text-cyan-200 sm:block" />
            </div>

            {loading && (
              <div className="flex items-center gap-2 p-6 text-neutral-50/60">
                <Loader2 className="size-4 animate-spin" />
                {t("wallet.loading")}
              </div>
            )}

            {error && !loading && (
              <div className="p-6 text-sm text-rose-100">{error}</div>
            )}

            {!loading && !error && wallets.length === 0 && (
              <div className="flex flex-col items-center gap-3 p-8 text-center">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-neutral-50">
                  <ReceiptText className="size-6" />
                </div>
                <p className="font-hk text-lg font-semibold text-neutral-50">
                  {t("wallet.noActivity")}
                </p>
                <p className="max-w-md text-sm leading-6 text-neutral-50/52">
                  {t("wallet.noActivityDescription")}
                </p>
              </div>
            )}

            {!loading && !error && wallets.length > 0 && (
              <div className="divide-y divide-neutral-50/10">
                {wallets.map((wallet) => {
                  const isDebit = wallet.type === "debit";
                  const Icon = isDebit ? ArrowDownLeft : ArrowUpRight;

                  return (
                    <div
                      key={wallet.id}
                      className="grid gap-4 p-5 text-neutral-50/72 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:p-6"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "rounded-2xl border p-3",
                            isDebit
                              ? "border-rose-200/20 bg-rose-300/10 text-rose-100"
                              : "border-cyan-200/20 bg-cyan-300/10 text-cyan-100",
                          )}
                        >
                          <Icon className="size-5" />
                        </span>
                        <div>
                          <p className="font-semibold text-neutral-50">
                            {wallet.title ?? t("wallet.entry", { id: wallet.id })}
                          </p>
                          <p className="mt-1 text-sm capitalize text-neutral-50/48">
                            {wallet.type ?? t("wallet.credit")} ·{" "}
                            {String(wallet.status ?? t("wallet.active"))}
                          </p>
                        </div>
                      </div>
                      <p className="font-hk text-lg font-semibold text-neutral-50">
                        {formatCurrency(wallet.amount ?? wallet.balance ?? 0)}
                      </p>
                      <p className="text-sm text-neutral-50/48">
                        {wallet.created_at
                          ? new Date(wallet.created_at).toLocaleDateString()
                          : t("payment.notRecorded")}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function WalletStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
      <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-neutral-950/35 text-cyan-100">
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-50/45">
        {label}
      </p>
      <p className="mt-2 font-hk text-xl font-semibold text-neutral-50">
        {value}
      </p>
    </div>
  );
}

function WalletTopUpForm({
  amount,
  gateway,
  onSuccess,
}: {
  amount: string;
  gateway?: PaymentGateway | null;
  onSuccess: () => void;
}) {
  const { t } = useAppTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const saveWalletMutation = useSaveWallet();
  const [cardComplete, setCardComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const amountNumber = Number(amount);
  const canSubmit =
    Boolean(stripe) &&
    Boolean(elements) &&
    cardComplete &&
    Number.isFinite(amountNumber) &&
    amountNumber > 0 &&
    !submitting &&
    !saveWalletMutation.isPending;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      toast.error(t("wallet.validAmount"));
      return;
    }

    if (!stripe || !elements) {
      toast.error(t("wallet.stripeNotReady"));
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      toast.error(t("wallet.cardUnavailable"));
      return;
    }

    setSubmitting(true);

    try {
      const intentResponse = await fetch("/api/stripe/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountNumber,
          currency: "usd",
          metadata: {
            flow: "wallet_top_up",
            gatewayId: String(gateway?.id ?? "stripe"),
          },
        }),
      });
      const intentData = (await intentResponse.json()) as PaymentIntentResponse;

      if (!intentResponse.ok || !intentData.clientSecret) {
        throw new Error(intentData.error || t("wallet.intentFailed"));
      }

      const confirmation = await stripe.confirmCardPayment(intentData.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (confirmation.error) {
        throw new Error(confirmation.error.message ?? t("wallet.paymentFailed"));
      }

      if (confirmation.paymentIntent?.status !== "succeeded") {
        throw new Error(t("wallet.paymentPending"));
      }

      await saveWalletMutation.mutateAsync({
        amount: amountNumber,
        type: "credit",
        gateway_id: gateway?.id,
        payment_method: getGatewayLabel(gateway),
        token: confirmation.paymentIntent.id,
        title: t("wallet.topUpTitle"),
      });

      cardElement.clear();
      onSuccess();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("wallet.paymentFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-neutral-50/72">
          {t("wallet.cardDetails")}
        </span>
        <div className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-4 transition-colors focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-300/20">
          <CardElement
            options={cardElementOptions}
            onChange={(event) => setCardComplete(event.complete)}
          />
        </div>
      </label>

      <Button
        type="submit"
        disabled={!canSubmit}
        className="h-12 rounded-xl bg-cyan-300 text-neutral-950 hover:bg-cyan-200"
      >
        {submitting || saveWalletMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t("wallet.processing")}
          </>
        ) : (
          t("wallet.confirmTopUp", {
            amount: formatCurrency(Number.isFinite(amountNumber) ? amountNumber : 0),
          })
        )}
      </Button>

      <p className="text-center text-xs leading-5 text-neutral-50/48">
        {t("wallet.stripeNotice")}
      </p>
    </form>
  );
}
