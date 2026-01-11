import { z } from 'zod';

export const CreateChatMessageSchema = z.object({
  senderId: z.number().int(),
  recipientId: z.number().int(),
  message: z.string().min(1, "Message cannot be empty"),
  timestamp: z.coerce.date().optional(),
});

export type CreateChatMessageDTO = z.infer<typeof CreateChatMessageSchema>;
