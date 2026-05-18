import { catalogData } from "@/data/catalog";
import type { CatalogItem } from "@/types/catalog";

export const catalogService = {
  list(): CatalogItem[] {
    return catalogData;
  },
};
