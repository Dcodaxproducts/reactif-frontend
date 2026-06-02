"use client";

import Image from "next/image";
import { Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useNotifications } from "@/hooks/useNotifications";

export default function Notifications() {
  const { t } = useAppTranslation();
  const { notifications, loading, error } = useNotifications();

  return (
    <section className="w-full flex justify-center px-4 py-10">
      <Card className="w-full max-w-5xl bg-neutral-800 rounded-3xl border border-neutral-50/30">
        <CardContent className="p-6 md:p-10 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6 text-pink-400" />
            <h1 className="text-neutral-50 text-3xl font-semibold font-hk">
              {t("notifications.title")}
            </h1>
          </div>

          {loading && <p className="text-neutral-50/60">{t("notifications.loading")}</p>}
          {error && <p className="text-red-400">{error}</p>}
          {!loading && !error && notifications.length === 0 && (
            <p className="text-neutral-50/60">{t("notifications.empty")}</p>
          )}

          <div className="flex flex-col gap-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex flex-col sm:flex-row gap-4 border-t border-neutral-50/10 pt-4"
              >
                {notification.image && (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-neutral-900">
                    <Image
                      src={notification.image}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-neutral-50 font-semibold">
                      {notification.title || t("notifications.fallbackTitle")}
                    </h2>
                    <span className="text-neutral-50/50 text-sm">
                      {notification.created_at || t("notifications.justNow")}
                    </span>
                  </div>
                  <p className="text-neutral-50/60">
                    {notification.message || notification.description}
                  </p>
                  <span className="text-xs text-pink-400 uppercase tracking-wide">
                    {notification.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
