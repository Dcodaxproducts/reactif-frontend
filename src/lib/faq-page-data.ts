import "server-only";

import { cache } from "react";
import { fallbackSupportFaqs } from "@/data/home";
import { getSupportFaqs } from "@/services/support";

export const getFaqPageData = cache(async () => {
  try {
    const faqs = await getSupportFaqs();
    return faqs.length > 0 ? faqs : fallbackSupportFaqs;
  } catch {
    return fallbackSupportFaqs;
  }
});
