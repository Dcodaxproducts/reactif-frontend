import { afterEach, describe, expect, it, vi } from "vitest";

import {
  APP_SETTINGS_STORAGE_KEY,
  DEFAULT_APP_SETTINGS,
  normalizeAppSettings,
  readAppSettings,
  writeAppSettings,
} from "./app-settings";

const createStorage = () => {
  const values = new Map<string, string>();

  return {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      values.set(key, value);
    }),
  };
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("app settings helpers", () => {
  it("normalizes supported theme and language values", () => {
    expect(normalizeAppSettings({ themeMode: "dark", language: "fr" })).toEqual({
      themeMode: "dark",
      language: "fr",
    });
  });

  it("falls back for invalid settings", () => {
    expect(normalizeAppSettings({ themeMode: "blue", language: "es" })).toEqual(
      DEFAULT_APP_SETTINGS,
    );
  });

  it("stores and reads settings from localStorage", () => {
    const localStorage = createStorage();
    vi.stubGlobal("window", { localStorage });

    writeAppSettings({ themeMode: "light", language: "en" });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      APP_SETTINGS_STORAGE_KEY,
      JSON.stringify({ themeMode: "light", language: "en" }),
    );
    expect(readAppSettings()).toEqual({ themeMode: "light", language: "en" });
  });
});
