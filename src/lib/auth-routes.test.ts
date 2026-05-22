import { describe, expect, it } from "vitest";

import { buildLoginRoute, getSafeRedirectPath } from "./auth-routes";

describe("getSafeRedirectPath", () => {
  it("returns default path for null or undefined redirects", () => {
    expect(getSafeRedirectPath(null)).toBe("/");
    expect(getSafeRedirectPath(undefined)).toBe("/");
  });

  it("preserves internal paths with search params and hash", () => {
    expect(getSafeRedirectPath("/profile?tab=main#bio")).toBe(
      "/profile?tab=main#bio",
    );
  });

  it("resolves same-origin absolute URLs to internal paths", () => {
    expect(getSafeRedirectPath("http://localhost/profile?tab=main#bio")).toBe(
      "/profile?tab=main#bio",
    );
  });

  it("returns default path for external URLs", () => {
    expect(getSafeRedirectPath("https://evil.com/profile")).toBe("/");
  });

  it("returns default path for protocol-relative URLs", () => {
    expect(getSafeRedirectPath("//evil.com/profile")).toBe("/");
  });

  it("returns default path for hostile protocols", () => {
    expect(getSafeRedirectPath("javascript:alert(1)")).toBe("/");
  });
});

describe("buildLoginRoute", () => {
  it("encodes the redirect query", () => {
    expect(buildLoginRoute("/profile?tab=main#bio")).toBe(
      "/login?redirect=%2Fprofile%3Ftab%3Dmain%23bio",
    );
  });
});
