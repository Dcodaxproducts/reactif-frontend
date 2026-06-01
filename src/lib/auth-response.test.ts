import { afterEach, describe, expect, it, vi } from "vitest";

import {
  clearInvalidAuthSession,
  extractAuthToken,
  mapAuthUser,
  resolveAuthResponse,
} from "./auth-response";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("auth response helpers", () => {
  it("extracts token from sessionToken", () => {
    expect(extractAuthToken({ sessionToken: "session-token" })).toBe(
      "session-token",
    );
  });

  it("extracts token from access_token", () => {
    expect(extractAuthToken({ access_token: "access-token" })).toBe(
      "access-token",
    );
  });

  it("extracts token from nested data.token", () => {
    expect(extractAuthToken({ data: { token: "nested-token" } })).toBe(
      "nested-token",
    );
  });

  it("maps user from full_name, name, or username", () => {
    expect(
      mapAuthUser({ email: "full@example.com", full_name: "Full Name" })
        ?.displayName,
    ).toBe("Full Name");
    expect(mapAuthUser({ email: "name@example.com", name: "Name" })?.displayName)
      .toBe("Name");
    expect(
      mapAuthUser({ email: "user@example.com", username: "username" })
        ?.displayName,
    ).toBe("username");
  });

  it("returns null for invalid auth response", () => {
    expect(resolveAuthResponse({ message: "invalid" })).toBeNull();
  });

  it("clears local auth state for invalid validation responses", () => {
    const removeItem = vi.fn();
    const dispatchEvent = vi.fn();

    vi.stubGlobal("window", {
      localStorage: {
        removeItem,
      },
      dispatchEvent,
    });

    expect(clearInvalidAuthSession()).toBeNull();
    expect(removeItem).toHaveBeenCalledWith("sessionToken");
    expect(dispatchEvent).toHaveBeenCalled();
  });
});
