import { z } from "zod";
import type { Service } from "@/types/categories";

type BookingValidationMessageKey =
  | "required"
  | "validEmail"
  | "validNumber"
  | "validPhone"
  | "validFile";

type BookingValidationMessageResolver = (
  key: BookingValidationMessageKey,
  label: string,
) => string;

const defaultMessageResolver: BookingValidationMessageResolver = (
  key,
  label,
) => {
  const messages: Record<BookingValidationMessageKey, string> = {
    required: `${label} is required`,
    validEmail: `${label} must be a valid email`,
    validNumber: `${label} must be a valid number`,
    validPhone: `${label} must be a valid phone number`,
    validFile: `${label} must be a valid file`,
  };

  return messages[key];
};

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

const buildStringValidator = (
  label: string,
  isRequired: boolean,
  message: BookingValidationMessageResolver,
) => {
  const validator = z.string().trim().min(1, message("required", label));

  if (isRequired) {
    return validator;
  }

  return z.preprocess(normalizeOptionalStringInput, z.string().optional());
};

const buildEmailValidator = (
  label: string,
  isRequired: boolean,
  message: BookingValidationMessageResolver,
) => {
  const validator = z
    .string()
    .trim()
    .min(1, message("required", label))
    .email(message("validEmail", label));

  if (isRequired) {
    return validator;
  }

  return z.preprocess(
    normalizeOptionalStringInput,
    z.string().email(message("validEmail", label)).optional(),
  );
};

const buildNumberValidator = (
  label: string,
  isRequired: boolean,
  message: BookingValidationMessageResolver,
) => {
  return z.unknown().superRefine((value, ctx) => {
    if (isBlankValue(value)) {
      if (isRequired) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message("required", label),
        });
      }

      return;
    }

    if (!isValidNumberInput(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: message("validNumber", label),
      });
    }
  });
};

const buildPhoneValidator = (
  label: string,
  isRequired: boolean,
  message: BookingValidationMessageResolver,
) => {
  const validator = z
    .string()
    .trim()
    .min(1, message("required", label))
    .min(6, message("validPhone", label));

  if (isRequired) {
    return validator;
  }

  return z.preprocess(
    normalizeOptionalStringInput,
    z.string().min(6, message("validPhone", label)).optional(),
  );
};

const buildFileValidator = (
  label: string,
  isRequired: boolean,
  message: BookingValidationMessageResolver,
) => {
  return z.unknown().superRefine((value, ctx) => {
    if (value == null) {
      if (isRequired) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message("required", label),
        });
      }

      return;
    }

    if (!isFileValue(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: message("validFile", label),
      });
    }
  });
};

const buildCheckboxValidator = (
  label: string,
  isRequired: boolean,
  message: BookingValidationMessageResolver,
) => {
  const validator = z.array(z.string());

  return isRequired
    ? validator.min(1, message("required", label))
    : validator.optional();
};

export const createServiceValidationSchema = (
  service?: Service | null,
  message: BookingValidationMessageResolver = defaultMessageResolver,
) => {
  const { fields } = service ?? {};

  if (!fields) return null;

  const schemaFields: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    const { input_type, label, field_name, is_required } = field;
    let validator: z.ZodTypeAny;

    switch (input_type) {
      case "email":
        validator = buildEmailValidator(label, is_required, message);
        break;
      case "number":
        validator = buildNumberValidator(label, is_required, message);
        break;
      case "tel":
        validator = buildPhoneValidator(label, is_required, message);
        break;
      case "file":
        validator = buildFileValidator(label, is_required, message);
        break;
      case "checkbox":
        validator = buildCheckboxValidator(label, is_required, message);
        break;
      default:
        validator = buildStringValidator(label, is_required, message);
    }

    schemaFields[field_name] = validator;
  });

  return z.object(schemaFields);
};

export const buildServiceValidationSchema = createServiceValidationSchema;
