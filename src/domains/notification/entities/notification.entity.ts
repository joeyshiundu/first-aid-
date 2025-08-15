export interface NotificationEntity {
  notification_id: number;
  title: string;
  message: string;
  category?: string;
  priority: 'low' | 'medium' | 'high';
  issued_by: string;
  issued_at: Date;
  expires_at?: Date;
  visible_to: 'all' | 'specific';
  timestamp: Date;

}
