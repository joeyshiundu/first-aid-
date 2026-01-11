export interface NotificationEntity {
  notification_id: number;
  title: string;
  message: string;
  category?: string;
  priority: 'low' | 'medium' | 'high';
  issuer_id: number; // Foreign Key to Users table (The Admin who sent it)
  issued_at: Date;
  expires_at?: Date;
  visible_to: 'all' | 'specific';
  user_id?: number; // The recipient of the notification (if specific)
  is_read: boolean; // Track if the user has seen it
}
``