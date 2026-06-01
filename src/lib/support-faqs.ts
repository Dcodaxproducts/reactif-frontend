import type { SupportFaq } from "@/types/support";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getString = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  return typeof value === "string" && value.trim() !== "" ? value : null;
};

const getFaqItems = (response: unknown): unknown[] => {
  if (Array.isArray(response)) {
    return response;
  }

  if (!isRecord(response)) {
    return [];
  }

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (Array.isArray(response.faqs)) {
    return response.faqs;
  }

  return [];
};

export const normalizeSupportFaqs = (response: unknown): SupportFaq[] =>
  getFaqItems(response).flatMap((item, index) => {
    if (!isRecord(item)) {
      return [];
    }

    const question = getString(item, "question") ?? getString(item, "title");
    const answer = getString(item, "answer") ?? getString(item, "description");

    if (!question || !answer) {
      return [];
    }

    const id = getString(item, "id") ?? getString(item, "value") ?? String(index + 1);
    const value = getString(item, "value") ?? id;

    return [
      {
        id,
        value,
        question,
        answer,
      },
    ];
  });
