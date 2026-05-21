import { z } from "zod";
import type { Service } from "@/types/categories";

export const isBlankValue = (value: unknown) => {
  return typeof value === "string" ? value.trim() === "" : value == null;
};

export const normalizeOptionalStringInput = (value: unknown) => {
  if (isBlankValue(value)) return undefined;
  return typeof value === "string" ? value.trim() : value;
};

export const isValidNumberInput = (value: unknown) => {
  if (typeof value === "number") return Number.isFinite(value);

  if (typeof value !== "string") return false;

  const trimmedValue = value.trim();
  if (trimmedValue === "") return false;

  return Number.isFinite(Number(trimmedValue));
};

export const isFileValue = (value: unknown): value is File => {
  const FileConstructor = globalThis.File;

  return (
    typeof FileConstructor !== "undefined" &&
    value !== null &&
    value !== undefined &&
    FileConstructor.prototype.isPrototypeOf(value)
  );
};

const buildStringValidator = (label: string, isRequired: boolean) => {
  const validator = z.string().trim().min(1, `${label} is required`);

  if (isRequired) {
    return validator;
  }

  return z.preprocess(normalizeOptionalStringInput, z.string().optional());
};

const buildEmailValidator = (label: string, isRequired: boolean) => {
  const validator = z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .email(`${label} must be a valid email`);

  if (isRequired) {
    return validator;
  }

  return z.preprocess(
    normalizeOptionalStringInput,
    z.string().email(`${label} must be a valid email`).optional(),
  );
};

const buildNumberValidator = (label: string, isRequired: boolean) => {
  return z.unknown().superRefine((value, ctx) => {
    if (isBlankValue(value)) {
      if (isRequired) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} is required`,
        });
      }

      return;
    }

    if (!isValidNumberInput(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${label} must be a valid number`,
      });
    }
  });
};

const buildPhoneValidator = (label: string, isRequired: boolean) => {
  const validator = z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .min(6, `${label} must be a valid phone number`);

  if (isRequired) {
    return validator;
  }

  return z.preprocess(
    normalizeOptionalStringInput,
    z.string().min(6, `${label} must be a valid phone number`).optional(),
  );
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
        validator = buildStringValidator(label, is_required);
    }

    schemaFields[field_name] = validator;
  });

  return z.object(schemaFields);
};
