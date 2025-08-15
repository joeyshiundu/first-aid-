import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { SessionEntity } from 'domains/chat/entities/session.entity';



export interface ChatSessionCreationAttributes extends Optional<SessionEntity, 'session_id' | 'user_id' | 'end_time'> {}

export class ChatSessionModel extends Model<SessionEntity, ChatSessionCreationAttributes> implements SessionEntity {
  public session_id!: number;
  public user_id!: number;
  public start_time!: Date;
  public end_time?: Date | null;
  public timestamp!: Date;

  static associate(models: any) {
    ChatSessionModel.belongsTo(models.user, { foreignKey: 'user_id' });
    ChatSessionModel.hasMany(models.chat_message, { foreignKey: 'session_id' });
  }
}

export function initChatSessionModel(sequelize: Sequelize): typeof ChatSessionModel {
  ChatSessionModel.init(
    {
      session_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: true },
      start_time: { type: DataTypes.DATE, allowNull: false },
      end_time: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
      timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      tableName: 'chat_session',
      timestamps: false,
    }
  );
  return ChatSessionModel;
}
