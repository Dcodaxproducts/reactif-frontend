import { API_ENDPOINTS } from "@/config/api-endpoints";
import api from "@/lib/axios";
import { normalizeSupportFaqs } from "@/lib/support-faqs";
import type { SupportFaq } from "@/types/support";

export const SUPPORT_ROUTES = {
  faqs: API_ENDPOINTS.supportFaqs,
};

export const getSupportFaqs = async (): Promise<SupportFaq[]> => {
  const { data } = await api.get<unknown>(SUPPORT_ROUTES.faqs);

  return normalizeSupportFaqs(data);
};
