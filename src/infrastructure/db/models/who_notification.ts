import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { NotificationEntity } from 'domains/notification/entities/notification.entity';


export interface WHONotificationCreationAttributes extends Optional<NotificationEntity, 'notification_id' | 'category' | 'expires_at'> {}

export class WHONotificationModel extends Model<NotificationEntity, WHONotificationCreationAttributes> implements NotificationEntity {
  public notification_id!: number;
  public title!: string;
  public message!: string;
  public category?: string;
  public priority!: 'low' | 'medium' | 'high';
  public issued_by!: string;
  public issued_at!: Date;
  public expires_at!: Date;
  public visible_to!: 'all' | 'specific';
  public timestamp!: Date;
}

export function initWHONotificationModel(sequelize: Sequelize): typeof WHONotificationModel {
  WHONotificationModel.init(
    {
      notification_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING(255), allowNull: false },
      message: { type: DataTypes.TEXT, allowNull: false },
      category: { type: DataTypes.STRING(100), allowNull: true },
      priority: { type: DataTypes.ENUM('low', 'medium', 'high'), defaultValue: 'low' },
      issued_by: { type: DataTypes.STRING(100), defaultValue: 'WHO' , allowNull: false },
      issued_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      expires_at: { type: DataTypes.DATE, allowNull: true },
      visible_to: { type: DataTypes.ENUM('all', 'specific'), defaultValue: 'all' },
      timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, 
    {
      sequelize,
      tableName: 'who_notification',
      timestamps: false,
    }
  );
  return WHONotificationModel;
}
