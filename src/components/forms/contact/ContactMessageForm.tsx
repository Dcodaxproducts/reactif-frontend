import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

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
import { getErrorMessage } from "@/lib/errors";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useCategories } from "@/hooks/useCategories";
import { useSaveCustomerSupportRequest } from "@/hooks/useCustomerSupport";
import { FormField } from "./FormField";
import { CONTACT_LABEL_CLASS } from "./contact-form-classes";

type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactMessageForm() {
  const { t } = useAppTranslation();
  const pathname = usePathname();
  const [shouldLoadServices, setShouldLoadServices] = useState(false);
  const { categories } = useCategories(
    { per_page: 100 },
    { enabled: shouldLoadServices },
  );
  const saveSupportRequest = useSaveCustomerSupportRequest();
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const supportSource = pathname === "/support" ? "support" : "contact";
  const serviceOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: String(category.id),
        label: category.name,
      })),
    [categories],
  );

  const setFieldValue = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSuccessMessage(null);
  };

  const validate = () => {
    const nextErrors: ContactFormErrors = {};
    const fullName = values.fullName.trim();
    const email = values.email.trim();
    const message = values.message.trim();

    if (!fullName) {
      nextErrors.fullName = t("validation.fullNameRequired");
    }

    if (!email) {
      nextErrors.email = t("validation.emailRequired");
    } else if (!emailPattern.test(email)) {
      nextErrors.email = t("validation.invalidEmail");
    }

    if (!message) {
      nextErrors.message = t("validation.messageRequired");
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const getSubmitErrorMessage = (error: unknown) => {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      (error as { response?: { status?: number } }).response?.status === 401
    ) {
      return t("contact.signInRequired");
    }

    return getErrorMessage(error, t("contact.submitError"));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await saveSupportRequest.mutateAsync({
        name: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || undefined,
        service:
          serviceOptions.find((option) => option.value === values.service)
            ?.label ?? values.service,
        message: values.message.trim(),
        source: supportSource,
      });

      const message = t("contact.submitSuccess");
      setValues(initialValues);
      setSuccessMessage(message);
      toast.success(message);
    } catch (error) {
      const message = getSubmitErrorMessage(error);
      setSuccessMessage(null);
      toast.error(message);
      setErrors((current) => ({ ...current, message }));
    }
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
        <FormField
          label={t("contact.fullName")}
          name="fullName"
          value={values.fullName}
          required
          error={errors.fullName}
          onChange={(value) => setFieldValue("fullName", value)}
        />

        <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
          {contactFields.map(({ name, labelKey, type }) => {
            const fieldName = name as keyof Pick<
              ContactFormValues,
              "email" | "phone"
            >;

            return (
              <FormField
                key={name}
                name={name}
                label={t(labelKey)}
                type={type}
                value={values[fieldName]}
                required={fieldName === "email"}
                error={errors[fieldName]}
                onChange={(value) => setFieldValue(fieldName, value)}
              />
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-service" className={CONTACT_LABEL_CLASS}>
            {t("contact.serviceInterestedIn")}
          </Label>
          <Select
            value={values.service}
            onValueChange={(value) => setFieldValue("service", value)}
            onOpenChange={(open) => {
              if (open) {
                setShouldLoadServices(true);
              }
            }}
          >
            <SelectTrigger
              id="contact-service"
              className="h-11 rounded-xl border-white/10 bg-zinc-800/25 px-4 text-white focus:border-cyan-200/70 focus:ring-cyan-200/20 md:h-12"
            >
              <SelectValue placeholder={t("contact.selectService")} />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.length > 0 ? (
                serviceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="general">
                  {t("contact.generalInquiry")}
                </SelectItem>
              )}
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
            value={values.message}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            onChange={(event) => setFieldValue("message", event.target.value)}
            className="h-32 resize-none rounded-2xl border-white/10 bg-zinc-800/25 px-4 py-3 text-white focus-visible:border-cyan-200/70 focus-visible:ring-cyan-200/20 md:h-40"
          />
          {errors.message ? (
            <p
              id="contact-message-error"
              className="text-xs font-medium text-rose-300"
            >
              {errors.message}
            </p>
          ) : null}
        </div>

        {successMessage ? (
          <p className="rounded-xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-200">
            {successMessage}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={saveSupportRequest.isPending}
          className="h-11 md:h-12 bg-white rounded-xl text-zinc-800 text-base md:text-lg font-semibold flex justify-center items-center gap-2 hover:scale-[1.02] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {saveSupportRequest.isPending
            ? t("contact.sending")
            : t("contact.sendMessage")}{" "}
          →
        </Button>
      </form>
    </div>
  );
}
