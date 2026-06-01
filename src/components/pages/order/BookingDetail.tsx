"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBookingDetail, useCancelBooking } from "@/hooks/useBookings";
import { formatBookingStatusLabel } from "@/lib/booking-status";
import { parseBookingData } from "./management/order-management-utils";

export default function BookingDetail() {
  const params = useParams();
  const router = useRouter();
  const bookingId = typeof params?.id === "string" ? params.id : null;
  const { booking, loading, error } = useBookingDetail(bookingId);
  const cancelBookingMutation = useCancelBooking();

  const handleCancel = async () => {
    if (!bookingId) return;

    try {
      await cancelBookingMutation.mutateAsync({
        booking_id: bookingId,
        cancellation_reason: "Canceled by customer",
      });
    } catch {
      toast.error("Unable to cancel booking");
    }
  };

  if (loading) {
    return <p className="text-neutral-50/60 p-8">Loading booking...</p>;
  }

  if (error || !booking) {
    return (
      <div className="p-8 flex flex-col gap-4">
        <p className="text-neutral-50/60">Booking detail is unavailable.</p>
        <Button onClick={() => router.push("/order/management")}>Back</Button>
      </div>
    );
  }

  const { serviceData, fieldResponses } = parseBookingData(booking);
  const serviceName =
    serviceData?.service_name ?? booking.service?.name ?? "Booking";

  return (
    <section className="w-full flex justify-center px-4 py-10">
      <Card className="w-full max-w-5xl bg-neutral-800/80 rounded-3xl border border-neutral-50/30">
        <CardContent className="p-6 md:p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-neutral-50 text-3xl font-semibold font-hk">
              {serviceName}
            </h1>
            <p className="text-neutral-50/60">
              ORD-{booking.id} • {formatBookingStatusLabel(booking.status)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-50/70">
            <p>Total: ${booking.total_amount}</p>
            <p>Subtotal: ${booking.subtotal ?? booking.total_amount}</p>
            <p>Scheduled: {booking.schedule_datetime ?? "Not scheduled"}</p>
            <p>Address: {booking.address || "Not provided"}</p>
            <p>Payment: {booking.payment_type ?? "Pending"}</p>
            <p>Booking Type: {booking.booking_type ?? "Direct"}</p>
          </div>

          {fieldResponses.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-neutral-50 text-xl font-semibold">
                Configuration
              </h2>
              {fieldResponses.map((field) => (
                <div
                  key={`${field.field_id ?? field.field_name}`}
                  className="flex justify-between gap-4 text-neutral-50/70"
                >
                  <span>{field.label ?? field.lable ?? field.field_name}</span>
                  <span>{field.value ?? "Not provided"}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => router.push(`/order/track/${booking.id}`)}>
              Track
            </Button>
            <Button
              variant="neutralOutline"
              disabled={cancelBookingMutation.isPending}
              onClick={handleCancel}
            >
              Cancel Booking
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

