import { catalogService } from "@/services/catalog";

export const useCatalog = () => {
  const items = catalogService.list();

  return { items };
};
