const LOGIN_ROUTE = "/login";
const VERIFY_ROUTE = "/register/enter-otp";
const RESET_PASSWORD_VERIFY_ROUTE = "/verify-otp";
const DEFAULT_REDIRECT_PATH = "/";

export function getSafeRedirectPath(redirectTo?: string | null) {
  if (!redirectTo) {
    return DEFAULT_REDIRECT_PATH;
  }

  if (redirectTo.startsWith("//")) {
    return DEFAULT_REDIRECT_PATH;
  }

  try {
    const baseOrigin =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost";
    const redirectUrl = new URL(redirectTo, baseOrigin);

    if (redirectUrl.origin !== baseOrigin) {
      return DEFAULT_REDIRECT_PATH;
    }

    return `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`;
  } catch {
    return DEFAULT_REDIRECT_PATH;
  }
}

export function buildLoginRoute(redirectTo?: string | null) {
  if (!redirectTo) {
    return LOGIN_ROUTE;
  }

  return `${LOGIN_ROUTE}?redirect=${encodeURIComponent(redirectTo)}`;
}

export function buildVerificationRoute(email?: string | null) {
  if (!email) {
    return VERIFY_ROUTE;
  }

  return `${VERIFY_ROUTE}?email=${encodeURIComponent(email)}`;
}

export function buildResetPasswordRoute(email?: string | null) {
  if (!email) {
    return RESET_PASSWORD_VERIFY_ROUTE;
  }

  return `${RESET_PASSWORD_VERIFY_ROUTE}?email=${encodeURIComponent(email)}`;
}
