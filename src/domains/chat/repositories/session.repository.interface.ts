import { SessionEntity } from "../entities/session.entity";

export interface ISessionRepository {
  findById(sessionId: number): Promise<SessionEntity | null>;
  create(session: SessionEntity): Promise<SessionEntity>;
  update(session: SessionEntity): Promise<SessionEntity | null>;
  delete(sessionId: number): Promise<boolean>;
}