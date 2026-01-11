import { z } from 'zod';

export const UpdateChatMessageSchema = z.object({
  messageId: z.number().int(),
  content: z.string().min(1, "Content cannot be empty"),
  timestamp: z.coerce.date().optional(),
});

export type UpdateChatMessageDTO = z.infer<typeof UpdateChatMessageSchema>;
