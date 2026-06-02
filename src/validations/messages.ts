import { z } from "zod";

type TranslationResolver = (key: string) => string;

export const createSendMessageSchema = (translate?: TranslationResolver) => {
  const messageRequired =
    translate?.("validation.messageRequired") ?? "Message is required";

  return z.object({
    booking_id: z.union([z.string().min(1), z.number()]),
    receiver_id: z.union([z.string().min(1), z.number()]),
    message: z.string().trim().min(1, messageRequired),
  });
};

export const sendMessageSchema = createSendMessageSchema();

export type SendMessageFormValues = z.infer<typeof sendMessageSchema>;
