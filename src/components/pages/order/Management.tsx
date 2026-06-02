"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { Container } from "@/components/common/Container";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useBookings } from "@/hooks/useBookings";
import { OrderCard } from "./management/OrderCard";

const Management = () => {
  const { t } = useAppTranslation();
  const { bookings, loading, error } = useBookings();

  useEffect(() => {
    if (error) toast.error(t("booking.failedToLoadBookings"));
  }, [error, t]);

  return (
    <div className="w-full min-h-screen">
      <Container width="7xl" gutter="management" className="py-8 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-neutral-50 text-3xl sm:text-4xl font-semibold font-hk">
            {t("booking.managementTitle")}
          </h1>
          <p className="text-neutral-50/60 text-base sm:text-lg font-medium font-hk">
            {t("booking.managementDescription")}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {loading && (
            <p className="text-neutral-50/60">
              {t("booking.loadingBookings")}
            </p>
          )}

          {!loading && bookings.length === 0 && (
            <p className="text-neutral-50/60">{t("booking.noBookingsFound")}</p>
          )}

          {bookings.map((booking) => (
            <OrderCard key={booking.id} booking={booking} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Management;
