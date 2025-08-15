import { NotificationEntity } from 'domains/notification/entities/notification.entity';
import { CreateNotificationDTO } from '../dtos/create_notification.dto';

export interface INotificationRepository {
  findById(notificationId: number): Promise<NotificationEntity | null>;
  create(notification: CreateNotificationDTO): Promise<NotificationEntity>;
  update(notificationId: number, notification: Partial<NotificationEntity>): Promise<NotificationEntity | null>;
  delete(notificationId: number): Promise<boolean>;
}