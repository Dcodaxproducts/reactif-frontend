import { catalogData } from "@/constants/catalog";
import type { CatalogItem } from "@/models/catalog";

export const catalogService = {
  list(): CatalogItem[] {
    return catalogData;
  },
};
