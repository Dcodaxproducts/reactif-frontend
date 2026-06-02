import { describe, expect, it } from "vitest";

import { parseNominatimAddress } from "./reverse-geocode";

describe("reverse geocode helpers", () => {
  it("maps a nominatim address into editable booking address fields", () => {
    expect(
      parseNominatimAddress({
        address: {
          house_number: "123",
          road: "Market Street",
          city: "San Francisco",
          state: "California",
          postcode: "94103",
        },
      }),
    ).toEqual({
      street: "123 Market Street",
      city: "San Francisco",
      state: "California",
      zip: "94103",
    });
  });

  it("falls back through locality fields when road-level data is unavailable", () => {
    expect(
      parseNominatimAddress({
        display_name: "Downtown, Sample City, Sample State",
        address: {
          suburb: "Downtown",
          town: "Sample City",
          state: "Sample State",
        },
      }),
    ).toEqual({
      street: "Downtown",
      city: "Sample City",
      state: "Sample State",
      zip: "",
    });
  });
});
