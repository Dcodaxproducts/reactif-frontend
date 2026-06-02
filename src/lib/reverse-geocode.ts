export type ReverseGeocodedAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

type NominatimAddress = {
  house_number?: string;
  road?: string;
  pedestrian?: string;
  neighbourhood?: string;
  suburb?: string;
  city?: string;
  town?: string;
  village?: string;
  municipality?: string;
  county?: string;
  state?: string;
  postcode?: string;
};

type NominatimReverseResponse = {
  display_name?: string;
  address?: NominatimAddress;
};

const buildStreetAddress = (
  address: NominatimAddress,
  displayName: string | undefined,
) => {
  const streetName = address.road ?? address.pedestrian;
  const street = [address.house_number, streetName]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(" ");

  return (
    street ||
    address.neighbourhood ||
    address.suburb ||
    address.city ||
    address.town ||
    displayName ||
    ""
  );
};

export const parseNominatimAddress = (
  response: NominatimReverseResponse,
): ReverseGeocodedAddress => {
  const address = response.address ?? {};

  return {
    street: buildStreetAddress(address, response.display_name),
    city:
      address.city ??
      address.town ??
      address.village ??
      address.municipality ??
      address.county ??
      "",
    state: address.state ?? "",
    zip: address.postcode ?? "",
  };
};

export const reverseGeocodeLocation = async (
  latitude: number,
  longitude: number,
): Promise<ReverseGeocodedAddress | null> => {
  const params = new URLSearchParams({
    format: "jsonv2",
    lat: String(latitude),
    lon: String(longitude),
    addressdetails: "1",
  });

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?${params.toString()}`,
  );

  if (!response.ok) return null;

  return parseNominatimAddress((await response.json()) as NominatimReverseResponse);
};
