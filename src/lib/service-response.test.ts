import { describe, expect, it } from "vitest";

import { normalizeServicesResponse } from "./service-response";

describe("normalizeServicesResponse", () => {
  it("supports data, array, and services response shapes", () => {
    const service = { id: 1, name: "Wrap" };

    expect(normalizeServicesResponse({ data: [service] }).data).toHaveLength(1);
    expect(normalizeServicesResponse([service]).data).toHaveLength(1);
    expect(normalizeServicesResponse({ services: [service] }).data)
      .toHaveLength(1);
  });

  it("normalizes service fields and options safely", () => {
    const response = normalizeServicesResponse({
      data: [
        {
          id: "7",
          name: "Paint Protection",
          description: "Protect paint",
          category_id: "2",
          sub_category_id: "3",
          service_image: "image.png",
          price: "99.5",
          fields: [
            {
              id: "11",
              label: "Finish",
              input_type: "select",
              field_name: "finish",
              is_required: "1",
              options: [{ key: "matte", display: "Matte" }],
            },
          ],
        },
      ],
    });

    expect(response.data[0]).toMatchObject({
      id: 7,
      name: "Paint Protection",
      category_id: 2,
      sub_category_id: 3,
      price: 99.5,
    });
    expect(response.data[0]?.fields[0]?.options).toEqual([
      { key: "matte", display: "Matte" },
    ]);
  });
});
