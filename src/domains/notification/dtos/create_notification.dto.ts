import { z } from 'zod';

export const CreateNotificationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  category: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  visible_to: z.enum(['all', 'specific']),
  user_id: z.number().int().optional(), // Renamed from userId to match Entity and snake_case convention
  expires_at: z.coerce.date().optional(),
});

// Automatically infer the TypeScript type from the schema
export type CreateNotificationDto = z.infer<typeof CreateNotificationSchema>;