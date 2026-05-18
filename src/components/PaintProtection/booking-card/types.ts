import type { ServiceField } from "@/types/categories";

export type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  fields: ServiceField[];
};

export type ServiceFormValues = Record<string, unknown>;
export type ServiceFormErrors = Record<string, string>;

export type FieldChangeHandler = (fieldName: string, value: unknown) => void;
