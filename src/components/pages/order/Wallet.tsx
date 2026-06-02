"use client";

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSaveWallet, useWalletList } from "@/hooks/usePayments";
import { formatCurrency } from "@/lib/currency";

export function Wallet() {
  const { wallets, loading, error } = useWalletList();
  const saveWalletMutation = useSaveWallet();
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

  const handleTopUpWallet = () => {
    const amount = Number(topUpAmount);

    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error("Please enter a valid top-up amount.");
      return;
    }

    saveWalletMutation.mutate(
      {
        amount,
        type: "credit",
      },
      {
        onSuccess: () => setTopUpAmount(""),
      },
    );
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
                Wallet
              </h1>
              <p className="text-neutral-50/60">
                Top up your wallet balance and review wallet activity.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-50/10 bg-neutral-900/60 px-5 py-4">
              <p className="text-neutral-50/50 text-xs font-semibold uppercase">
                Current Balance
              </p>
              <p className="mt-1 text-pink-400 text-2xl font-semibold">
                {formatCurrency(walletBalance)}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-50/10 bg-neutral-900/50 p-4 md:p-5 flex flex-col md:flex-row gap-3 md:items-end">
            <label className="flex-1 flex flex-col gap-2">
              <span className="text-neutral-50/70 text-sm font-semibold">
                Top-up Amount
              </span>
              <Input
                type="number"
                min="1"
                step="0.01"
                value={topUpAmount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                className="text-neutral-50 border-neutral-50/20"
              />
            </label>

            <Button
              type="button"
              onClick={handleTopUpWallet}
              disabled={saveWalletMutation.isPending}
              className="h-[52px] px-6"
            >
              {saveWalletMutation.isPending ? "Adding..." : "Top Up Wallet"}
            </Button>
          </div>

          {loading && <p className="text-neutral-50/60">Loading...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {!loading && wallets.length === 0 && (
            <p className="text-neutral-50/60">No wallet activity found.</p>
          )}
          {wallets.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-neutral-50 text-xl font-semibold font-hk">
                Wallet Activity
              </h2>
              {wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-neutral-50/10 pt-4 text-neutral-50/70"
                >
                  <span>{wallet.title ?? `Wallet entry #${wallet.id}`}</span>
                  <span className="capitalize">{wallet.type ?? "credit"}</span>
                  <span className="font-semibold text-neutral-50">
                    {formatCurrency(wallet.amount ?? wallet.balance ?? 0)}
                  </span>
                  <span>{String(wallet.status ?? "active")}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
