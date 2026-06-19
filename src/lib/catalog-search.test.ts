import { describe, expect, it } from "vitest";

import {
  filterCatalogCategories,
  filterCatalogServices,
} from "./catalog-search";
import type { Category, Service } from "@/types/categories";

const services: Service[] = [
  {
    id: 1,
    name: "Full Wrap",
    description: "Vehicle wrap",
    category_id: 6,
    sub_category_id: 79,
    service_image: "",
    price: 10,
    fields: [],
  },
  {
    id: 2,
    name: "Business Cards",
    description: "Printed stationery",
    category_id: 7,
    sub_category_id: 80,
    service_image: "",
    price: 25,
    fields: [],
  },
];

const categories: Category[] = [
  {
    id: 6,
    name: "SIGNALÉTIQUE",
    status: 1,
    subcategories: [
      {
        id: 79,
        name: "Test category",
        description: "",
        category_image: "",
        status: 1,
      },
    ],
  },
  {
    id: 7,
    name: "Print",
    status: 1,
    subcategories: [
      {
        id: 80,
        name: "Cards",
        description: "",
        category_image: "",
        status: 1,
      },
    ],
  },
];

describe("filterCatalogServices", () => {
  it("returns all services when search is empty", () => {
    expect(filterCatalogServices({ services, categories, search: "" }))
      .toHaveLength(2);
  });

  it("matches service, category, and subcategory text", () => {
    expect(filterCatalogServices({ services, categories, search: "wrap" }))
      .toEqual([expect.objectContaining({ id: 1 })]);
    expect(filterCatalogServices({ services, categories, search: "signaletique" }))
      .toEqual([expect.objectContaining({ id: 1 })]);
    expect(filterCatalogServices({ services, categories, search: "Test category" }))
      .toEqual([expect.objectContaining({ id: 1 })]);
  });
});

describe("filterCatalogCategories", () => {
  it("matches category and subcategory text", () => {
    expect(filterCatalogCategories({ categories, search: "signalétique" }))
      .toEqual([expect.objectContaining({ id: 6 })]);
    expect(filterCatalogCategories({ categories, search: "test category" }))
      .toEqual([expect.objectContaining({ id: 6 })]);
  });
});
