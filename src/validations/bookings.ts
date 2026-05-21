import { z } from "zod";
import type { Service } from "@/types/categories";

const buildEmailValidator = (label: string, isRequired: boolean) => {
  const validator = z.string().email(`${label} must be a valid email`);

  if (isRequired) {
    return z
      .string()
      .min(1, `${label} is required`)
      .pipe(validator);
  }

  return z.preprocess(
    (value) => (value === "" || value == null ? undefined : value),
    validator.optional(),
  );
};

const buildNumberValidator = (label: string, isRequired: boolean) => {
  return z.unknown().superRefine((value, ctx) => {
    const normalizedValue = typeof value === "string" ? value.trim() : value;

    if (normalizedValue === "" || normalizedValue == null) {
      if (isRequired) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} is required`,
        });
      }

      return;
    }

    const numericValue =
      typeof normalizedValue === "number" ? normalizedValue : +normalizedValue;

    if (!Number.isFinite(numericValue)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${label} must be a valid number`,
      });
    }
  });
};

const buildPhoneValidator = (label: string, isRequired: boolean) => {
  const validator = z.string().min(6, `${label} must be a valid phone number`);

  if (isRequired) {
    return z
      .string()
      .min(1, `${label} is required`)
      .pipe(validator);
  }

  return z.preprocess(
    (value) => (value === "" || value == null ? undefined : value),
    validator.optional(),
  );
};

const isFileValue = (value: unknown): value is File => {
  return typeof File !== "undefined" && value instanceof File;
};

const buildFileValidator = (label: string, isRequired: boolean) => {
  return z.unknown().superRefine((value, ctx) => {
    if (value == null) {
      if (isRequired) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} is required`,
        });
      }

      return;
    }

    if (!isFileValue(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${label} must be a valid file`,
      });
    }
  });
};

const buildCheckboxValidator = (label: string, isRequired: boolean) => {
  const validator = z.array(z.string());

  return isRequired
    ? validator.min(1, `${label} is required`)
    : validator.optional();
};

export const buildServiceValidationSchema = (service?: Service | null) => {
  const { fields } = service ?? {};

  if (!fields) return null;

  const schemaFields: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    const { input_type, label, field_name, is_required } = field;
    let validator: z.ZodTypeAny;

    switch (input_type) {
      case "email":
        validator = buildEmailValidator(label, is_required);
        break;
      case "number":
        validator = buildNumberValidator(label, is_required);
        break;
      case "tel":
        validator = buildPhoneValidator(label, is_required);
        break;
      case "file":
        validator = buildFileValidator(label, is_required);
        break;
      case "checkbox":
        validator = buildCheckboxValidator(label, is_required);
        break;
      default:
        validator = is_required
          ? z.string().min(1, `${label} is required`)
          : z.preprocess(
              (value) => (value === "" || value == null ? undefined : value),
              z.string().optional(),
            );
    }

    schemaFields[field_name] = validator;
  });

  return z.object(schemaFields);
};
