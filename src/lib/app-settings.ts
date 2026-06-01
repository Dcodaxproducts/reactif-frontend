import type { AppSettings } from "@/types/settings";
import { appSettingsSchema } from "../validations/settings";

export const APP_SETTINGS_STORAGE_KEY = "reactif.appSettings";

export const DEFAULT_APP_SETTINGS: AppSettings = {
  themeMode: "system",
  language: "en",
};

const isBrowser = () => typeof window !== "undefined";

export const normalizeAppSettings = (value: unknown): AppSettings => {
  const result = appSettingsSchema.safeParse(value);

  return result.success ? result.data : DEFAULT_APP_SETTINGS;
};

export const readAppSettings = (): AppSettings => {
  if (!isBrowser()) return DEFAULT_APP_SETTINGS;

  try {
    const rawSettings = window.localStorage.getItem(APP_SETTINGS_STORAGE_KEY);
    if (!rawSettings) return DEFAULT_APP_SETTINGS;

    return normalizeAppSettings(JSON.parse(rawSettings));
  } catch {
    return DEFAULT_APP_SETTINGS;
  }
};

export const writeAppSettings = (settings: AppSettings) => {
  if (!isBrowser()) return;

  // Backend API integration point: replace local settings persistence with HTTP calls when settings endpoints are available.
  window.localStorage.setItem(
    APP_SETTINGS_STORAGE_KEY,
    JSON.stringify(normalizeAppSettings(settings)),
  );
};
