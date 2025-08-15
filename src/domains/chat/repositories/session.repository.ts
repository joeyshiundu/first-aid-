import { ISessionRepository} from "./session.repository.interface";
import { SessionEntity } from "../entities/session.entity";
import { ChatSessionModel } from "../../../infrastructure/db/models/chat_session";

export class SessionEntityRepository implements ISessionRepository {
    async findById(sessionId: number): Promise<SessionEntity | null> {
        const session = await ChatSessionModel.findByPk(sessionId);
        return session ? (session.toJSON() as SessionEntity) : null;
    }

    async create(session: SessionEntity): Promise<SessionEntity> {
        const newSession = await ChatSessionModel.create(session);
        return newSession.toJSON() as SessionEntity;
    }

    async update(session: SessionEntity): Promise<SessionEntity | null> {
        await ChatSessionModel.update(session, { where: { session_id: session.session_id } });
        const updated = await ChatSessionModel.findByPk(session.session_id);
        return updated ? (updated.toJSON() as SessionEntity) : null;
    }

    async delete(sessionId: number): Promise<boolean> {
        const deletedCount = await ChatSessionModel.destroy({ where: { session_id: sessionId } });
        return deletedCount > 0;
    }
}