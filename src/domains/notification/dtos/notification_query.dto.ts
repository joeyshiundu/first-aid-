import { z } from 'zod';

export const NotificationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  
  // Filters
  is_read: z.enum(['true', 'false']).transform((val) => val === 'true').optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  visible_to: z.enum(['all', 'specific']).optional(),
});

export type NotificationQueryDto = z.infer<typeof NotificationQuerySchema>;
