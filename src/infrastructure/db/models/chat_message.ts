import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { MessageEntity } from 'domains/chat/entities/message.entity';

/*
export interface ChatMessageAttributes {
  message_id: number;
  message: string;
  session_id: number;
  user_id: number;
  created_at: Date;
}
*/
export interface ChatMessageCreationAttributes extends Optional<MessageEntity, 'message_id'> {}

export class ChatMessageModel extends Model<MessageEntity, ChatMessageCreationAttributes> implements MessageEntity {
  public message_id!: number;
  public content!: string;
  public session_id!: number;
  public user_id!: number;
  public timestamp!: Date;

  static associate(models: any) {
    ChatMessageModel.belongsTo(models.user, { foreignKey: 'user_id' });
    ChatMessageModel.belongsTo(models.chat_session, { foreignKey: 'session_id' });
  }
}

export function initChatMessageModel(sequelize: Sequelize): typeof ChatMessageModel {
  ChatMessageModel.init(
    {
      message_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      content: { type: DataTypes.STRING(100), allowNull: false },
      session_id: { type: DataTypes.INTEGER, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      tableName: 'chat_message',
      timestamps: false,
    }
  );
  return ChatMessageModel;
}
