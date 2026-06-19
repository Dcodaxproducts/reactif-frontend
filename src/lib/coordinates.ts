type CoordinateKind = "latitude" | "longitude";

const coordinateRanges: Record<CoordinateKind, { min: number; max: number }> = {
  latitude: { min: -90, max: 90 },
  longitude: { min: -180, max: 180 },
};

export const isValidCoordinate = (
  value: string,
  kind: CoordinateKind,
) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return false;
  }

  const parsed = Number(trimmed);
  const range = coordinateRanges[kind];

  return Number.isFinite(parsed) && parsed >= range.min && parsed <= range.max;
};

export const hasValidCoordinates = ({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) =>
  isValidCoordinate(latitude, "latitude") &&
  isValidCoordinate(longitude, "longitude");
