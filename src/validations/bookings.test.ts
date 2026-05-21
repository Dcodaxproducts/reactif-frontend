import { describe, expect, it } from "vitest";

import { buildServiceValidationSchema } from "./bookings";
import type { Service } from "@/types/categories";

const buildService = ({
  inputType,
  isRequired,
}: {
  inputType: string;
  isRequired: boolean;
}): Service => ({
  id: 1,
  name: "Test Service",
  description: "Test service description",
  category_id: 1,
  sub_category_id: 1,
  service_image: "",
  price: 10,
  fields: [
    {
      id: 1,
      label: "Test Field",
      input_type: inputType,
      field_name: "testField",
      is_required: isRequired,
    },
  ],
});

const parseField = ({
  inputType,
  isRequired,
  value,
}: {
  inputType: string;
  isRequired: boolean;
  value: unknown;
}) => {
  const schema = buildServiceValidationSchema(
    buildService({ inputType, isRequired }),
  );

  if (!schema) throw new Error("Expected schema to be created");

  return schema.safeParse({ testField: value });
};

describe("buildServiceValidationSchema", () => {
  it("fails required number when blank", () => {
    const result = parseField({
      inputType: "number",
      isRequired: true,
      value: "",
    });

    expect(result.success).toBe(false);
  });

  it("passes optional number when blank", () => {
    const result = parseField({
      inputType: "number",
      isRequired: false,
      value: "",
    });

    expect(result.success).toBe(true);
  });

  it("passes numeric zero string", () => {
    const result = parseField({
      inputType: "number",
      isRequired: true,
      value: "0",
    });

    expect(result.success).toBe(true);
  });

  it("fails non-numeric number input", () => {
    const result = parseField({
      inputType: "number",
      isRequired: true,
      value: "not-a-number",
    });

    expect(result.success).toBe(false);
  });

  it("fails required checkbox when empty", () => {
    const result = parseField({
      inputType: "checkbox",
      isRequired: true,
      value: [],
    });

    expect(result.success).toBe(false);
  });

  it("passes optional checkbox when empty", () => {
    const result = parseField({
      inputType: "checkbox",
      isRequired: false,
      value: [],
    });

    expect(result.success).toBe(true);
  });

  it("fails required file when null", () => {
    const result = parseField({
      inputType: "file",
      isRequired: true,
      value: null,
    });

    expect(result.success).toBe(false);
  });

  it("passes optional file when null", () => {
    const result = parseField({
      inputType: "file",
      isRequired: false,
      value: null,
    });

    expect(result.success).toBe(true);
  });
});
