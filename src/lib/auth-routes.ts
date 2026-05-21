const LOGIN_ROUTE = "/login";
const VERIFY_ROUTE = "/register/enter-otp";
const RESET_PASSWORD_VERIFY_ROUTE = "/verify-otp";

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
