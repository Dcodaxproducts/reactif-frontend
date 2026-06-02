import { z } from "zod";

export const sendMessageSchema = z.object({
  booking_id: z.union([z.string().min(1), z.number()]),
  receiver_id: z.union([z.string().min(1), z.number()]),
  message: z.string().trim().min(1, "Message is required"),
});

export type SendMessageFormValues = z.infer<typeof sendMessageSchema>;
