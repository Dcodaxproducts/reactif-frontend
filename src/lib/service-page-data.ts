import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getServices } from "@/services/categories";
import type { Service } from "@/types/categories";

const getCachedServiceCatalog = unstable_cache(
  async () => {
    const { data } = await getServices({ per_page: 100 });
    return data.filter(({ status }) => status !== 0);
  },
  ["public-service-catalog"],
  { revalidate: 3600 },
);

export async function getPublicServiceCatalog(): Promise<Service[]> {
  try {
    return await getCachedServiceCatalog();
  } catch {
    return [];
  }
}

export const getServicePageData = cache(async (serviceId: string) => {
  const services = await getPublicServiceCatalog();
  return (
    services.find(({ id }) => String(id) === String(serviceId)) ?? null
  );
});
