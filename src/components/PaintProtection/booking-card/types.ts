import type { Service } from "@/models/categories";

export type { Service };
export type ServiceFormValues = Record<string, unknown>;
export type ServiceFormErrors = Record<string, string>;
export type FieldChangeHandler = (fieldName: string, value: unknown) => void;
