import { z } from "zod";
import type { Service } from "@/types/categories";

export const buildServiceValidationSchema = (service?: Service | null) => {
  if (!service?.fields) return null;

  const schemaFields: Record<string, z.ZodTypeAny> = {};

  service.fields.forEach((field) => {
    let validator: z.ZodTypeAny;

    switch (field.input_type) {
      case "email":
        validator = z.string().email(`${field.label} must be a valid email`);
        break;
      case "number":
        validator = z.coerce
          .number()
          .min(0, `${field.label} must be a valid number`);
        break;
      case "tel":
        validator = z
          .string()
          .min(6, `${field.label} must be a valid phone number`);
        break;
      case "file":
        validator = z.any();
        break;
      case "checkbox":
        validator = z.array(z.string());
        break;
      default:
        validator = z.string();
    }

    schemaFields[field.field_name] = field.is_required
      ? validator.refine(
          (value) =>
            value !== undefined &&
            value !== null &&
            value !== "" &&
            !(Array.isArray(value) && value.length === 0),
          `${field.label} is required`,
        )
      : validator.optional();
  });

  return z.object(schemaFields);
};
