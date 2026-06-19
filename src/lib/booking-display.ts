export const formatBookingDateTime = (
  value: string | null | undefined,
  fallback: string,
) => {
  if (!value) {
    return fallback;
  }

  const normalized = value.includes(" ") ? value.replace(" ", "T") : value;
  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export const formatBookingDisplayValue = (
  value: string | number | null | undefined,
  fallback: string,
) => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return String(value);
};

export const formatBookingLabel = (
  value: string | number | null | undefined,
  fallback: string,
) => {
  const displayValue = formatBookingDisplayValue(value, fallback);

  if (displayValue === fallback) {
    return fallback;
  }

  return displayValue
    .replace(/[_-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};
