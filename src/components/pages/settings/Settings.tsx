"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSettings } from "@/hooks/useAppSettings";
import { appSettingsSchema } from "@/validations/settings";
import type { AppSettings, LanguageCode, ThemeMode } from "@/types/settings";

const themeOptions: Array<{ label: string; value: ThemeMode }> = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

const languageOptions: Array<{ label: string; value: LanguageCode }> = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
];

export default function Settings() {
  const { settings, updateSettings } = useAppSettings();
  const [draftSettings, setDraftSettings] = useState<AppSettings>(settings);

  useEffect(() => {
    setDraftSettings(settings);
  }, [settings]);

  const handleSave = () => {
    const result = appSettingsSchema.safeParse(draftSettings);

    if (!result.success) {
      toast.error("Please select valid settings");
      return;
    }

    updateSettings(result.data);
    toast.success("Settings saved");
  };

  return (
    <section className="w-full flex justify-center px-4 py-10">
      <Card className="w-full max-w-4xl bg-neutral-800 rounded-3xl border border-neutral-50/30">
        <CardContent className="p-6 md:p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-neutral-50 text-3xl font-semibold font-hk">
              Settings
            </h1>
            <p className="text-neutral-50/60">
              Manage local display preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-neutral-50 font-semibold">Theme</label>
              <Select
                value={draftSettings.themeMode}
                onValueChange={(themeMode: ThemeMode) =>
                  setDraftSettings((current) => ({ ...current, themeMode }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  {themeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-neutral-50 font-semibold">Language</label>
              <Select
                value={draftSettings.language}
                onValueChange={(language: LanguageCode) =>
                  setDraftSettings((current) => ({ ...current, language }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleSave}
            className="w-full h-12 bg-pink-400 hover:bg-pink-500 rounded-lg text-neutral-50 text-lg font-semibold font-hk"
          >
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
