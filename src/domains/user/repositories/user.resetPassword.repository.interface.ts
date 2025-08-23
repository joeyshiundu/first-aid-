import { ResetPasswordEntity } from "../entities/resetPassword.entity";

export interface UserResetPasswordRepository {
    createResetPasswordEntry(data: ResetPasswordEntity): Promise<ResetPasswordEntity>;
    findResetPasswordEntryByToken(token: string): Promise<ResetPasswordEntity | null>;
    deleteResetPasswordEntry(id: number): Promise<void>;
}
