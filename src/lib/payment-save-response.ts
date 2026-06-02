export const getPaymentSaveError = (data: unknown) => {
  if (typeof data !== "object" || data === null || !("errorInfo" in data)) {
    return null;
  }

  const { errorInfo } = data as { errorInfo?: unknown };

  return Array.isArray(errorInfo)
    ? errorInfo.map(String).filter(Boolean).join(" ")
    : "Payment could not be saved";
};
