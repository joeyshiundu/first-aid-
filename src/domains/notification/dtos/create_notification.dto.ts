export interface CreateNotificationDTO {
  notification_id?: number; // Optional ID for the notification, auto-generated if not provided
  title: string;         // Title of the notification
  category?: string;    // Optional category for the notification
  priority: 'low' | 'medium' | 'high'; // Priority level of the notification
  issued_by: string;   // Who issued the notification, defaults to 'WHO'
  issued_at: Date;     // When the notification was issued, defaults to current date
  expires_at: Date; // Optional expiration date for the notification, null if it doesn't expire
  visible_to: 'all' | 'specific'; // Visibility of the notification, defaults to 'all'
  userId: number;          // ID of the user to whom the notification is sent
  message: string;        // Content of the notification
  timestamp: Date;       // Optional timestamp (auto-generated if not provided)
}