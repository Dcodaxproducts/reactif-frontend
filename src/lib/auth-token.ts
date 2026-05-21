const AUTH_TOKEN_STORAGE_KEY = "sessionToken";
const AUTH_TOKEN_EVENT = "reactif-auth-token-change";

function emitAuthTokenChange() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(AUTH_TOKEN_EVENT));
}

export function getStoredAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export function setStoredAuthToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  emitAuthTokenChange();
}

export function clearStoredAuthToken() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  emitAuthTokenChange();
}

export function subscribeToAuthTokenChange(callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handler = () => callback();

  window.addEventListener(AUTH_TOKEN_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(AUTH_TOKEN_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export { AUTH_TOKEN_STORAGE_KEY };
