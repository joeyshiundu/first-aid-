import { z } from 'zod';
import { CreateNotificationSchema } from './create_notification.dto';

// Create a partial schema where all fields are optional
export const UpdateNotificationSchema = CreateNotificationSchema.partial();

export type UpdateNotificationDto = z.infer<typeof UpdateNotificationSchema>;