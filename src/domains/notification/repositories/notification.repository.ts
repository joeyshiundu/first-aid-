import { NotificationEntity } from 'domains/notification/entities/notification.entity';
import { CreateNotificationDTO } from '../dtos/create_notification.dto';
import { INotificationRepository } from './notification.repository.interface';
import { WHONotificationModel } from '../../../infrastructure/db/models/who_notification';

export class NotificationRepository implements INotificationRepository {
  async findById(notificationId: number): Promise<NotificationEntity | null> {
    const notification = await WHONotificationModel.findByPk(notificationId);
    return notification ? (notification.toJSON() as NotificationEntity) : null;
  }

  async create(notification: CreateNotificationDTO): Promise<NotificationEntity> {
    const newNotification = await WHONotificationModel.create(notification);
    return newNotification.toJSON() as NotificationEntity;
  }

  async update(notificationId: number, notification: Partial<NotificationEntity>): Promise<NotificationEntity | null> {
    await WHONotificationModel.update(notification, { where: { notification_id: notificationId } });
    const updated = await WHONotificationModel.findByPk(notificationId);
    return updated ? (updated.toJSON() as NotificationEntity) : null;
  }

  async delete(notificationId: number): Promise<boolean> {
    const deletedCount = await WHONotificationModel.destroy({ where: { notification_id: notificationId } });
    return deletedCount > 0;
  }
}