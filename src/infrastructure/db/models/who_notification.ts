import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { NotificationEntity } from '@domain/notification/entities/notification.entity';


export interface WHONotificationCreationAttributes extends Optional<NotificationEntity, 'notification_id' | 'category' | 'expires_at' | 'user_id' | 'is_read'> {}

export class WHONotificationModel extends Model<NotificationEntity, WHONotificationCreationAttributes> implements NotificationEntity {
  public notification_id!: number;
  public title!: string;
  public message!: string;
  public category?: string;
  public priority!: 'low' | 'medium' | 'high';
  public issuer_id!: number;
  public issued_at!: Date;
  public expires_at?: Date | null;
  public visible_to!: 'all' | 'specific';
  public user_id?: number;
  public is_read!: boolean;
}

export function initWHONotificationModel(sequelize: Sequelize): typeof WHONotificationModel {
  WHONotificationModel.init(
    {
      notification_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING(255), allowNull: false },
      message: { type: DataTypes.TEXT, allowNull: false },
      category: { type: DataTypes.STRING(100), allowNull: true },
      priority: { type: DataTypes.ENUM('low', 'medium', 'high'), defaultValue: 'low' },
      issuer_id: { type: DataTypes.INTEGER, defaultValue: 1 , allowNull: false },
      issued_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      expires_at: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
      visible_to: { type: DataTypes.ENUM('all', 'specific'), defaultValue: 'all' },
      user_id: { type: DataTypes.INTEGER, allowNull: true },
      is_read: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    }, 
    {
      sequelize,
      tableName: 'who_notification',
      timestamps: false,
    }
  );
  return WHONotificationModel;
}
