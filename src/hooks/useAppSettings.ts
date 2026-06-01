"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  DEFAULT_APP_SETTINGS,
  readAppSettings,
  writeAppSettings,
} from "@/lib/app-settings";
import type { AppSettings } from "@/types/settings";

export const useAppSettings = () => {
  const { setTheme } = useTheme();
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_APP_SETTINGS);

  useEffect(() => {
    const storedSettings = readAppSettings();
    setSettings(storedSettings);
    setTheme(storedSettings.themeMode);
  }, [setTheme]);

  const updateSettings = (nextSettings: AppSettings) => {
    writeAppSettings(nextSettings);
    setSettings(nextSettings);
    setTheme(nextSettings.themeMode);
  };

  return {
    settings,
    updateSettings,
  };
};
