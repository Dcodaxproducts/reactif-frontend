"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { buildLoginRoute, useAuth } from "@/hooks/useAuth";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { writeBookingDraft } from "@/lib/booking-draft";
import { addCartItem } from "@/lib/cart";
import { BookingCardHeader } from "./booking-card/BookingCardHeader";
import { BookingCardSkeleton } from "./booking-card/BookingCardSkeleton";
import { BookingSummary } from "./booking-card/BookingSummary";
import { DynamicServiceFields } from "./booking-card/DynamicServiceFields";
import { ServiceSelector } from "./booking-card/ServiceSelector";
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
  parentCategory?: string | null;
  services?: Service[];
  isLoading?: boolean;
  designerId?: string | null;
}

export function PaintProtectionCard({
  activeItem,
  setActiveItem,
  activeCategory,
  parentCategory = null,
  services = [],
  isLoading = false,
  designerId = null,
}: PaintProtectionCardProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { t } = useAppTranslation();

  const [formErrors, setFormErrors] = useState<ServiceFormErrors>({});
  const [formValues, setFormValues] = useState<ServiceFormValues>({});
  const [bookingLoading, setBookingLoading] = useState(false);

  const currentService = useMemo(
    () => services.find(({ id }) => id.toString() === activeItem),
    [activeItem, services],
  );

  useEffect(() => {
    if (isLoading) return;

    if (services.length === 0) {
      setActiveItem(null);
      return;
    }

    const hasActiveService = services.some(
      ({ id }) => id.toString() === activeItem,
    );

    if (!hasActiveService) {
      setActiveItem(services[0].id.toString());
    }
  }, [activeItem, services, isLoading, setActiveItem]);

  useEffect(() => {
    setFormValues(buildInitialServiceValues(currentService));
    setFormErrors({});
  }, [currentService]);

  const handleSelectService = (serviceId: string) => {
    setActiveItem(serviceId);
  };

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
      toast.error(t("bookingFlow.requiredFieldsError"));
    }

    return isValid;
  };

  const handleCreateBooking = async () => {
    if (!currentService) {
      toast.error(t("bookingFlow.selectServiceError"));
      return;
    }

    if (!user) {
      toast.error(t("bookingFlow.loginRequired"));
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
        parentCategory,
        formValues,
        designerId,
      });

      addCartItem(draft);
      writeBookingDraft(draft);
      toast.success(t("bookingFlow.addedToCart"));
      router.push("/cart");
    } catch {
      toast.error(t("bookingFlow.saveDraftError"));
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="w-full md:w-auto p-6 md:p-8 rounded-3xl outline-1 outline-slate-700 flex flex-col gap-6">
      <BookingCardHeader activeCategory={activeCategory} />

      {isLoading && <BookingCardSkeleton />}

      {!isLoading && services.length > 1 && (
        <ServiceSelector
          services={services}
          selectedServiceId={activeItem}
          onSelect={handleSelectService}
        />
      )}

      {!isLoading && (
        <div className="text-neutral-400 text-sm md:text-base font-medium font-hk leading-relaxed">
          {currentService?.description ??
            t("bookingFlow.selectServiceDescription")}
        </div>
      )}

      {!isLoading && services.length === 0 && (
        <ServiceEmptyState>
          {t("bookingFlow.noServicesAvailable")}
        </ServiceEmptyState>
      )}

      {!isLoading &&
        currentService &&
        (!currentService.fields || currentService.fields.length === 0) && (
          <ServiceEmptyState>
            {t("bookingFlow.noAdditionalConfiguration")}
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
