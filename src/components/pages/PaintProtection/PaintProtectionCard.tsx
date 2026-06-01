"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { buildLoginRoute, useAuth } from "@/hooks/useAuth";
import { writeBookingDraft } from "@/lib/booking-draft";
import { BookingCardHeader } from "./booking-card/BookingCardHeader";
import { BookingCardSkeleton } from "./booking-card/BookingCardSkeleton";
import { BookingSummary } from "./booking-card/BookingSummary";
import { DynamicServiceFields } from "./booking-card/DynamicServiceFields";
import { ServiceEmptyState } from "./booking-card/ServiceEmptyState";
import {
  buildBookingDraft,
  buildInitialServiceValues,
  validateServiceForm,
} from "./booking-card/booking-form-utils";
import type {
  Service,
  ServiceFormErrors,
  ServiceFormValue,
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

  const [formErrors, setFormErrors] = useState<ServiceFormErrors>({});
  const [formValues, setFormValues] = useState<ServiceFormValues>({});
  const [bookingLoading, setBookingLoading] = useState(false);

  const designerId = searchParams.get("designerId");
  const currentService = services.find(
    ({ id }) => id.toString() === activeItem,
  );
  useEffect(() => {
    if (!isLoading && services.length > 0) {
      setActiveItem(services[0].id.toString());
    }
  }, [activeCategory, services, isLoading, setActiveItem]);

  useEffect(() => {
    setFormValues(buildInitialServiceValues(currentService));
  }, [currentService]);

  const handleChange = (fieldName: string, value: ServiceFormValue) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
    setFormErrors((prev) => {
      const updated = { ...prev };
      delete updated[fieldName];
      return updated;
    });
  };

  const validateForm = () => {
    const { errors, isValid } = validateServiceForm(
      currentService,
      formValues,
    );

    setFormErrors(errors);

    if (!isValid) {
      toast.error("Please fill all required fields");
    }

    return isValid;
  };

  const handleCreateBooking = async () => {
    if (!currentService) {
      toast.error("Please select a service");
      return;
    }

    if (!user) {
      toast.error("Please login first");
      const redirectUrl =
        typeof window !== "undefined"
          ? `${window.location.pathname}${window.location.search}${window.location.hash}`
          : null;
      router.push(buildLoginRoute(redirectUrl));
      return;
    }

    if (!validateForm()) return;

    try {
      setBookingLoading(true);
      const draft = buildBookingDraft({
        service: currentService,
        activeCategory,
        formValues,
        designerId,
      });

      writeBookingDraft(draft);
      router.push("/order/address");
    } catch {
      toast.error("Failed to save booking draft");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="w-full md:w-auto p-6 md:p-8 rounded-3xl outline-1 outline-slate-700 flex flex-col gap-6">
      <BookingCardHeader activeCategory={activeCategory} />

      {isLoading && <BookingCardSkeleton />}

      {!isLoading && (
        <div className="text-neutral-400 text-sm md:text-base font-medium font-hk leading-relaxed">
          {currentService?.description ??
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
