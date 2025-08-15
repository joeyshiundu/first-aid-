import { IMessageRepository } from "../repositories/message.repository.interface";
import { MessageEntity } from "../entities/message.entity";
import { ChatMessageModel } from "../../../infrastructure/db/models/chat_message";

export class MessageEntityRepository implements IMessageRepository {
    async findById(messageId: number): Promise<MessageEntity | null> {
        const message = await ChatMessageModel.findByPk(messageId);
        return message ? (message.toJSON() as MessageEntity) : null;
    }

    async create(message: MessageEntity): Promise<MessageEntity> {
        const newMessage = await ChatMessageModel.create(message);
        return newMessage.toJSON() as MessageEntity;
    }

    async update(message: MessageEntity): Promise<MessageEntity | null> {
        await ChatMessageModel.update(message, { where: { message_id: message.message_id } });
        const updated = await ChatMessageModel.findByPk(message.message_id);
        return updated ? (updated.toJSON() as MessageEntity) : null;
    }

    async delete(messageId: number): Promise<boolean> {
        const deletedCount = await ChatMessageModel.destroy({ where: { message_id: messageId } });
        return deletedCount > 0;
    }

    async findBySessionId(sessionId: number): Promise<MessageEntity[]> {
        const messages = await ChatMessageModel.findAll({ where: { session_id: sessionId } });
        return messages.map(msg => msg.toJSON() as MessageEntity);
    }
}