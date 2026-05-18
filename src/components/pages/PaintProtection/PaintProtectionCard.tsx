"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useCreateBooking } from "@/hooks/useBookings";
import { BookingCardHeader } from "./booking-card/BookingCardHeader";
import { BookingCardSkeleton } from "./booking-card/BookingCardSkeleton";
import { BookingSummary } from "./booking-card/BookingSummary";
import { DynamicServiceFields } from "./booking-card/DynamicServiceFields";
import { ServiceEmptyState } from "./booking-card/ServiceEmptyState";
import {
  buildBookingFormData,
  buildInitialServiceValues,
} from "./booking-card/booking-form-utils";
import { buildServiceValidationSchema } from "@/validations/bookings";
import type {
  Service,
  ServiceFormErrors,
  ServiceFormValues,
} from "@/types/component-props";

interface PaintProtectionCardProps {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
  activeCategory: string | null;
  services?: Service[];
  isLoading?: boolean;
}

export default function PaintProtectionCard({
  activeItem,
  setActiveItem,
  activeCategory,
  services = [],
  isLoading = false,
}: PaintProtectionCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const createBookingMutation = useCreateBooking();

  const [formErrors, setFormErrors] = useState<ServiceFormErrors>({});
  const [formValues, setFormValues] = useState<ServiceFormValues>({});

  const designerId = searchParams.get("designerId");
  const currentService = services.find(
    (service) => service.id.toString() === activeItem,
  );
  const bookingLoading = createBookingMutation.isPending;

  useEffect(() => {
    if (!isLoading && services.length > 0) {
      setActiveItem(services[0].id.toString());
    }
  }, [activeCategory, services, isLoading, setActiveItem]);

  useEffect(() => {
    setFormValues(buildInitialServiceValues(currentService));
  }, [currentService]);

  const handleChange = (fieldName: string, value: unknown) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
    setFormErrors((prev) => {
      const updated = { ...prev };
      delete updated[fieldName];
      return updated;
    });
  };

  const validateForm = () => {
    const schema = buildServiceValidationSchema(currentService);
    if (!schema) return true;

    const result = schema.safeParse(formValues);
    if (result.success) {
      setFormErrors({});
      return true;
    }

    const errors: ServiceFormErrors = {};
    result.error.errors.forEach((error) => {
      const field = error.path[0] as string;
      errors[field] = error.message;
    });

    setFormErrors(errors);
    toast.error("Please fill all required fields");
    return false;
  };

  const handleCreateBooking = async () => {
    if (!currentService) {
      toast.error("Please select a service");
      return;
    }

    if (!user) {
      toast.error("Please login first");
      if (typeof window !== "undefined") {
        localStorage.setItem("redirectAfterLogin", window.location.href);
      }
      router.push("/login");
      return;
    }

    if (!validateForm()) return;

    try {
      const formData = buildBookingFormData({
        service: currentService,
        activeCategory,
        formValues,
        designerId,
      });

      await createBookingMutation.mutateAsync(formData);
      router.push("/order/management");
    } catch (error) {
      console.error("Booking Error:", error);
    }
  };

  return (
    <div className="w-full md:w-auto p-6 md:p-8 rounded-3xl outline outline-1 outline-slate-700 flex flex-col gap-6">
      <BookingCardHeader activeCategory={activeCategory} />

      {isLoading && <BookingCardSkeleton />}

      {!isLoading && (
        <div className="text-neutral-400 text-sm md:text-base font-medium font-hk leading-relaxed">
          {currentService?.description ||
            "Please select a service to configure your request."}
        </div>
      )}

      {!isLoading && services.length === 0 && (
        <ServiceEmptyState>
          No services available under this category.
        </ServiceEmptyState>
      )}

      {!isLoading &&
        currentService &&
        (!currentService.fields || currentService.fields.length === 0) && (
          <ServiceEmptyState>
            This service does not require additional configuration.
          </ServiceEmptyState>
        )}

      {!isLoading &&
        currentService?.fields &&
        currentService.fields.length > 0 && (
          <DynamicServiceFields
            service={currentService}
            formValues={formValues}
            formErrors={formErrors}
            onChange={handleChange}
          />
        )}

      <BookingSummary
        activeCategory={activeCategory}
        currentService={currentService}
        isSubmitting={bookingLoading}
        authLoading={authLoading}
        onSubmit={handleCreateBooking}
      />
    </div>
  );
}
