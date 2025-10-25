import { IUserRepository } from '../../../../domains/user/repositories/user.repository.interface';
import { ITokenService } from '../../../services/token.service.interface';
import bcrypt from 'bcrypt';
import { UserResetPasswordRepository } from '../../../../domains/user/repositories/user.resetPassword.repository.interface';
import { InvalidCredentialsError } from '../../../errors/auth.errors';

export class PerformPasswordResetUseCase {
    constructor(
        private userRepository: IUserRepository,
        private resetPasswordRepository: UserResetPasswordRepository,
        private tokenService: ITokenService
    ) {}

    async execute(token: string, newPassword: string): Promise<void> {
        // 1. Verify the token is valid and not expired using the specific reset token verifier
        const payload = this.tokenService.verifyPasswordResetToken(token);
        if (!payload) {
            throw new InvalidCredentialsError('Password reset token is invalid or has expired.');
        }

        // 2. Check if the token exists in the database
        const resetEntry = await this.resetPasswordRepository.findResetPasswordEntryByToken(token);
        if (!resetEntry || new Date() > new Date(resetEntry.resetTokenExpiry)) {
            if(resetEntry) await this.resetPasswordRepository.deleteResetPasswordEntry(resetEntry.reset_id!);
            throw new InvalidCredentialsError('Password reset token is invalid or has expired.');
        }

        // 3. Hash the new password and update the user
        const user = await this.userRepository.findById(resetEntry.user_id);
        if (!user) throw new Error(`User with id ${resetEntry.user_id} not found for password reset.`);

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await this.userRepository.update(user);

        // 4. Delete the used token
        await this.resetPasswordRepository.deleteResetPasswordEntry(resetEntry.reset_id!);
    }
}