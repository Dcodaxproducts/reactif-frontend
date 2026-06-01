import { clearStoredAuthToken } from "./auth-token";
import type { AuthUser } from "@/types/auth";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getString = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  return typeof value === "string" && value.trim() !== "" ? value : null;
};

const getNumber = (record: Record<string, unknown>, key: string) => {
  const value = record[key];

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

const getBoolean = (record: Record<string, unknown>, key: string) => {
  const value = record[key];

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value === 1;
  }

  if (typeof value === "string") {
    const normalized = value.toLowerCase();
    if (normalized === "true" || normalized === "1") return true;
    if (normalized === "false" || normalized === "0") return false;
  }

  return null;
};

const getNestedData = (value: unknown) => {
  if (!isRecord(value)) return null;

  const { data } = value;
  return isRecord(data) ? data : null;
};

export const extractAuthToken = (response: unknown): string | null => {
  if (!isRecord(response)) {
    return null;
  }

  return (
    getString(response, "sessionToken") ??
    getString(response, "token") ??
    getString(response, "access_token") ??
    getString(response, "accessToken") ??
    (getNestedData(response)
      ? extractAuthToken(getNestedData(response))
      : null)
  );
};

export const mapAuthUser = (response: unknown): AuthUser | null => {
  if (!isRecord(response)) {
    return null;
  }

  const data = getNestedData(response);
  let userSource = response;

  if (isRecord(response.user)) {
    userSource = response.user;
  } else if (data && isRecord(data.user)) {
    userSource = data.user;
  } else if (data) {
    userSource = data;
  }

  const email = getString(userSource, "email") ?? getString(response, "email");

  if (!email) {
    return null;
  }

  const userId =
    getNumber(userSource, "userId") ??
    getNumber(userSource, "id") ??
    getNumber(response, "userId") ??
    getNumber(response, "id") ??
    0;
  const displayName =
    getString(userSource, "full_name") ??
    getString(userSource, "name") ??
    getString(userSource, "username") ??
    getString(userSource, "displayName") ??
    email;
  const isVerified =
    getBoolean(userSource, "is_verified") ??
    getBoolean(userSource, "isVerified") ??
    true;

  return {
    userId,
    email,
    displayName,
    isVerified,
  };
};

export const isAuthValidationResponseValid = (response: unknown): boolean => {
  if (!isRecord(response)) {
    return false;
  }

  const status =
    getBoolean(response, "valid") ??
    getBoolean(response, "success") ??
    getBoolean(response, "authenticated") ??
    getBoolean(response, "is_valid");

  if (status !== null) {
    return status;
  }

  const data = getNestedData(response);

  if (data) {
    return isAuthValidationResponseValid(data);
  }

  return Boolean(extractAuthToken(response) || mapAuthUser(response));
};

export const resolveAuthResponse = (response: unknown): AuthUser | null => {
  const token = extractAuthToken(response);
  const user = mapAuthUser(response);

  if (!token && !user) {
    return null;
  }

  return user;
};

export const clearInvalidAuthSession = () => {
  clearStoredAuthToken();
  return null;
};
