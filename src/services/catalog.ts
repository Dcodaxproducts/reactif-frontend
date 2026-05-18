import { catalogData } from "@/constants/catalog";
import type { CatalogItem } from "@/types/catalog";

export const catalogService = {
  list(): CatalogItem[] {
    return catalogData;
  },
};
