import { describe, expect, it } from "vitest";

import {
  filterServicesByParams,
  normalizeServiceDetailResponse,
  normalizeServicesResponse,
} from "./service-response";

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
          image_gallery: [{ url: "gallery-one.png" }, "gallery-two.png"],
          price: "99.5",
          status: "1",
          lead_time: "3 business days",
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
      status: 1,
      lead_time: "3 business days",
      image_gallery: ["gallery-one.png", "gallery-two.png"],
    });
    expect(response.data[0]?.fields[0]?.options).toEqual([
      { key: "matte", display: "Matte" },
    ]);
  });

  it("normalizes a service detail response wrapped in data", () => {
    expect(
      normalizeServiceDetailResponse({
        data: {
          id: "52",
          name: "Vehicle Lettering",
          category_id: "6",
          sub_category_id: null,
          price: "250",
        },
      }),
    ).toMatchObject({
      id: 52,
      name: "Vehicle Lettering",
      category_id: 6,
      sub_category_id: 0,
      price: 250,
    });
  });

  it("keeps only services linked to requested category filters", () => {
    const services = normalizeServicesResponse({
      data: [
        { id: 1, name: "Full Wrap", category_id: 10, sub_category_id: 0 },
        { id: 2, name: "Fleet Branding", category_id: 20, sub_category_id: 0 },
      ],
    }).data;

    expect(filterServicesByParams(services, { category_id: 999 })).toEqual([]);
    expect(filterServicesByParams(services, { category_id: 10 })).toEqual([
      expect.objectContaining({ id: 1, category_id: 10 }),
    ]);
  });

  it("keeps only services linked to requested subcategory and service filters", () => {
    const services = normalizeServicesResponse({
      data: [
        { id: 1, name: "Full Wrap", category_id: 10, sub_category_id: 5 },
        { id: 2, name: "Window Graphics", category_id: 10, sub_category_id: 6 },
      ],
    }).data;

    expect(filterServicesByParams(services, { sub_category_id: 5 })).toEqual([
      expect.objectContaining({ id: 1, sub_category_id: 5 }),
    ]);
    expect(filterServicesByParams(services, { service_id: 2 })).toEqual([
      expect.objectContaining({ id: 2 }),
    ]);
  });
});
