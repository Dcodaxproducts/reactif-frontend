"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { addressFields } from "@/data/order";
import { readBookingDraft, writeBookingDraft } from "@/lib/booking-draft";
import {
  buildOrderDetailItems,
  buildOrderFieldGroups,
  buildOrderPriceRows,
  buildPersonalInfoFields,
  getOrderTotalLabel,
} from "@/lib/order-address-summary";
import { reverseGeocodeLocation } from "@/lib/reverse-geocode";
import type { BookingDraft } from "@/types/bookings";
import { PersonalInfo } from "./OrderAddress/PersonalInfo";
import { Configuration } from "./OrderAddress/Configuration";
import { WhyProtection } from "./OrderAddress/WhyProtection";

type AddressFormValues = {
  street: string;
  city: string;
  state: string;
  zip: string;
  latitude: string;
  longitude: string;
};

const emptyAddressValues: AddressFormValues = {
  street: "",
  city: "",
  state: "",
  zip: "",
  latitude: "",
  longitude: "",
};

const buildAddress = ({ street, city, state, zip }: AddressFormValues) =>
  [street, city, state, zip].map((value) => value.trim()).filter(Boolean).join(", ");

const hydrateAddressValues = (draft: BookingDraft | null): AddressFormValues => ({
  ...emptyAddressValues,
  street: draft?.address ?? "",
  latitude: draft?.latitude ?? "",
  longitude: draft?.longitude ?? "",
});

export function OrderAddress() {
  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [addressValues, setAddressValues] =
    useState<AddressFormValues>(emptyAddressValues);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    const nextDraft = readBookingDraft();
    setDraft(nextDraft);
    setAddressValues(hydrateAddressValues(nextDraft));
  }, []);

  const fieldGroups = useMemo(() => buildOrderFieldGroups(draft), [draft]);
  const detailItems = useMemo(() => buildOrderDetailItems(draft), [draft]);
  const priceRows = useMemo(() => buildOrderPriceRows(draft), [draft]);
  const personalFields = useMemo(() => buildPersonalInfoFields(draft), [draft]);
  const totalEstimated = useMemo(() => getOrderTotalLabel(draft), [draft]);
  const configurationSubtitle = draft
    ? `${draft.selected_service.name} · ${
        draft.selected_subcategory?.name ?? draft.selected_category ?? "Selected category"
      }`
    : "Select a service first to see dynamic configuration details.";
  const editableAddressFields = addressFields.map((field) => {
    const name = field.name as keyof AddressFormValues | undefined;

    return {
      ...field,
      value: name ? addressValues[name] : field.defaultValue,
    };
  });

  const handleAddressChange = (name: string, value: string) => {
    if (!(name in emptyAddressValues)) return;

    setAddressValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const saveDraftLocation = () => {
    if (!draft) {
      toast.error("Booking draft is missing. Please start the booking again.");
      return false;
    }

    const address = buildAddress(addressValues);
    const latitude = addressValues.latitude.trim();
    const longitude = addressValues.longitude.trim();

    if (!address || !latitude || !longitude) {
      toast.error("Please add address, latitude, and longitude before payment.");
      return false;
    }

    const updatedDraft = {
      ...draft,
      address,
      latitude,
      longitude,
    };

    writeBookingDraft(updatedDraft);
    setDraft(updatedDraft);
    toast.success("Booking location saved");
    return true;
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Location is not supported by this browser.");
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const latitude = String(coords.latitude);
        const longitude = String(coords.longitude);

        try {
          const address = await reverseGeocodeLocation(
            coords.latitude,
            coords.longitude,
          );

          setAddressValues((current) => ({
            ...current,
            street: address?.street || current.street,
            city: address?.city || current.city,
            state: address?.state || current.state,
            zip: address?.zip || current.zip,
            latitude,
            longitude,
          }));
          toast.success(
            address
              ? "Current location and address added"
              : "Current latitude and longitude added",
          );
        } catch {
          setAddressValues((current) => ({
            ...current,
            latitude,
            longitude,
          }));
          toast.success("Current latitude and longitude added");
        } finally {
          setLocationLoading(false);
        }
      },
      () => {
        setLocationLoading(false);
        toast.error("Unable to get current location. Please enter it manually.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  };

  return (
    <section className="w-full flex flex-col items-center gap-10 py-8 px-5 md:px-0">
      <PersonalInfo
        fields={personalFields}
        editableAddressFields={editableAddressFields}
        locationLoading={locationLoading}
        onAddressChange={handleAddressChange}
        onUseCurrentLocation={handleUseCurrentLocation}
        onSave={saveDraftLocation}
      />
      <WhyProtection draft={draft} details={detailItems} />
      <Configuration
        route="/order/payment"
        optionGroups={fieldGroups}
        priceRows={priceRows}
        totalEstimated={totalEstimated}
        subtitle={configurationSubtitle}
        showRating={false}
        onBeforeNavigate={saveDraftLocation}
      />
    </section>
  );
}
