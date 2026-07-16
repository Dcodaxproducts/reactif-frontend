import { API_ENDPOINTS } from "@/config/api-endpoints";
import api from "@/lib/axios";
import { normalizeCustomerSupportRequests } from "@/lib/customer-support";
import {
  FAQ_BACKEND_ERROR_MESSAGE,
  isSupportFaqBackendError,
  normalizeSupportFaqs,
} from "@/lib/support-faqs";
import type { CustomerSupportRequest, SupportFaq } from "@/types/support";

export type CustomerSupportPayload = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  source: "contact" | "support";
};

export type CustomerSupportResponse = {
  message?: string;
  status?: string | boolean;
  success?: boolean;
};

export const SUPPORT_ROUTES = {
  faqs: API_ENDPOINTS.supportFaqs,
  customerSupportList: API_ENDPOINTS.customerSupportList,
  customerSupportSave: API_ENDPOINTS.customerSupportSave,
  chatMessageSave: API_ENDPOINTS.chatMessageSave,
};

export const getSupportFaqs = async (): Promise<SupportFaq[]> => {
  const { data } = await api.get<unknown>(SUPPORT_ROUTES.faqs);

  if (isSupportFaqBackendError(data)) {
    throw new Error(FAQ_BACKEND_ERROR_MESSAGE);
  }

  return normalizeSupportFaqs(data);
};

export const getCustomerSupportRequests = async (): Promise<
  CustomerSupportRequest[]
> => {
  const { data } = await api.get<unknown>(SUPPORT_ROUTES.customerSupportList);

  return normalizeCustomerSupportRequests(data);
};

export const saveCustomerSupportRequest = async (
  payload: CustomerSupportPayload,
): Promise<CustomerSupportResponse> => {
  const { data } = await api.post<CustomerSupportResponse>(
    SUPPORT_ROUTES.customerSupportSave,
    {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      service: payload.service,
      category: payload.service,
      subject: payload.service || payload.source,
      message: payload.message,
      source: payload.source,
    },
  );

  if (data.success === false || data.status === false) {
    throw new Error(data.message);
  }

  return data;
};
