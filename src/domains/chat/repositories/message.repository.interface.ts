import { MessageEntity } from "../entities/message.entity";

export interface IMessageRepository {
  findById(messageId: number): Promise<MessageEntity | null>;
  create(message: MessageEntity): Promise<MessageEntity>;
  update(message: MessageEntity): Promise<MessageEntity | null>;
  delete(messageId: number): Promise<boolean>;
  findBySessionId(sessionId: number): Promise<MessageEntity[]>;
}