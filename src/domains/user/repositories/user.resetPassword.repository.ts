import { ResetPasswordEntity } from "../entities/resetPassword.entity";
import { ResetPasswordModel } from "../../../infrastructure/db/models/reset_password";
import { UserResetPasswordRepository } from "./user.resetPassword.repository.interface";

export class ResetPasswordRepository implements UserResetPasswordRepository {
    async createResetPasswordEntry(data: ResetPasswordEntity): Promise<ResetPasswordEntity> {
        const resetPasswordEntry = await ResetPasswordModel.create(data);
        return resetPasswordEntry.toJSON() as ResetPasswordEntity;
    }

    async findResetPasswordEntryByToken(token: string): Promise<ResetPasswordEntity | null> {
        const entry = await ResetPasswordModel.findOne({ where: { resetToken: token } });
        return entry ? entry.toJSON() as ResetPasswordEntity : null;
    }

    async deleteResetPasswordEntry(id: number): Promise<void> {
        await ResetPasswordModel.destroy({ where: { reset_id: id } });
    }
}
