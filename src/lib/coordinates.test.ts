import { describe, expect, it } from "vitest";

import { hasValidCoordinates, isValidCoordinate } from "./coordinates";

describe("coordinate validation", () => {
  it("accepts finite latitude and longitude values in range", () => {
    expect(isValidCoordinate("33.61343400", "latitude")).toBe(true);
    expect(isValidCoordinate("73.13166000", "longitude")).toBe(true);
    expect(hasValidCoordinates({ latitude: "-90", longitude: "180" }))
      .toBe(true);
  });

  it("rejects non-numeric or out-of-range values", () => {
    expect(isValidCoordinate("---11", "latitude")).toBe(false);
    expect(isValidCoordinate("91", "latitude")).toBe(false);
    expect(isValidCoordinate("181", "longitude")).toBe(false);
    expect(hasValidCoordinates({ latitude: "33", longitude: "abc" }))
      .toBe(false);
  });
});
