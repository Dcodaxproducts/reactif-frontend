import { catalogData } from "@/data/catalog";
import type { CatalogItem } from "@/models/catalog";

export const catalogService = {
  list(): CatalogItem[] {
    return catalogData;
  },
};
