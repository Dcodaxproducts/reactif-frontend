import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contactFields } from "@/data/contact";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { FormField } from "./FormField";
import { CONTACT_LABEL_CLASS } from "./contact-form-classes";

export function ContactMessageForm() {
  const { t } = useAppTranslation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="relative flex-1 overflow-hidden">
      <div
        className="absolute inset-0 blur-[20px]"
        style={{
          background:
            "conic-gradient(from 162deg at 58% 96%, rgba(255,172,136,0.5) 0deg, rgba(242,98,181,0) 125deg, rgba(95,197,255,0.5) 193deg, rgba(128,84,255,0.5) 236deg, rgba(119,157,255,0.5) 260deg, rgba(159,115,241,0) 311deg)",
        }}
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex flex-col gap-6 md:gap-8 bg-black/40 backdrop-blur-xl border-t md:border-t-0 md:border-l border-stone-500 p-6 sm:p-8 md:p-10"
      >
        <FormField label={t("contact.fullName")} name="fullName" />

        <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
          {contactFields.map(({ name, labelKey, type }) => (
            <FormField key={name} name={name} label={t(labelKey)} type={type} />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-service" className={CONTACT_LABEL_CLASS}>
            {t("contact.serviceInterestedIn")}
          </Label>
          <Select>
            <SelectTrigger
              id="contact-service"
              className="h-11 md:h-12 rounded-xl bg-zinc-800/25 border border-blue-600 px-4 text-white outline-none"
            >
              <SelectValue placeholder={t("contact.selectService")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vehicle-wraps">
                {t("contact.selectService")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-message" className={CONTACT_LABEL_CLASS}>
            {t("contact.message")}
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            className="h-32 md:h-40 rounded-2xl bg-zinc-800/25 border border-white/10 px-4 py-3 text-white outline-none resize-none focus:border-blue-500 transition"
          />
        </div>

        <Button type="submit" className="h-11 md:h-12 bg-white rounded-xl text-zinc-800 text-base md:text-lg font-semibold flex justify-center items-center gap-2 hover:scale-[1.02] transition hover:bg-white">
          {t("contact.sendMessage")} →
        </Button>
      </form>
    </div>
  );
}
