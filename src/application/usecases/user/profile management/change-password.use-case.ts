import { ChangePasswordSchema } from "domains/user/dtos/password.dto";
import { IUserRepository } from "domains/user/repositories/user.repository.interface";
import { z } from "zod";
import bcrypt from 'bcrypt';

export class ChangePasswordUseCase {
    constructor(
        private userRepository: IUserRepository
    ) {}

    async execute(userId: number, passwordData: z.infer<typeof ChangePasswordSchema>): Promise<boolean> {
        const user = await this.userRepository.findByUserId(userId);
        if (!user) {
            // It's often better to throw a more specific or a generic error
            // to avoid leaking information about user existence.
            throw new Error('Could not change password.');
        }

        const isOldPasswordValid = await bcrypt.compare(passwordData.oldPassword, user.password);
        if (!isOldPasswordValid) {
            throw new Error('Invalid old password.');
        }

        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(passwordData.newPassword, saltRounds);

        user.password = hashedNewPassword;
        await this.userRepository.update(user);

        return true;
    }
}