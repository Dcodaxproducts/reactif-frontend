"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSaveWallet, useWalletList } from "@/hooks/usePayments";

export default function Wallet() {
  const { wallets, loading, error } = useWalletList();
  const saveWalletMutation = useSaveWallet();

  const handleSaveWallet = () => {
    saveWalletMutation.mutate({
      payment_method: "saved_method",
      title: "Saved payment method",
    });
  };

  return (
    <section className="w-full flex justify-center px-4 py-10">
      <Card className="w-full max-w-5xl bg-neutral-800 rounded-3xl border border-neutral-50/30">
        <CardContent className="p-6 md:p-10 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-neutral-50 text-3xl font-semibold font-hk">
              Wallet
            </h1>
            <Button onClick={handleSaveWallet}>Save Payment Method</Button>
          </div>
          {loading && <p className="text-neutral-50/60">Loading...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {!loading && wallets.length === 0 && (
            <p className="text-neutral-50/60">No wallet methods found.</p>
          )}
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-neutral-50/10 pt-4 text-neutral-50/70"
            >
              <span>{wallet.title}</span>
              <span>{wallet.payment_method}</span>
              <span>{String(wallet.status ?? "active")}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
