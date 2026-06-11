export type SupportFaq = {
  id: string;
  value: string;
  question: string;
  answer: string;
};

export type CustomerSupportRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  subject: string;
  message: string;
  status: string;
  source: string;
  created_at: string;
};
