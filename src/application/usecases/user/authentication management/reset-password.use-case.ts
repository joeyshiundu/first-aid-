// Update the import path below if the file exists elsewhere, or create the file if missing.

import { IUserRepository } from '../../../../domains/user/repositories/user.repository.interface';
import { ResetPasswordRepository } from 'domains/user/repositories/user.resetPassword.repository';
import { ITokenService } from '../../../services/token.service.interface';
import { IEmailService } from '../../../../application/services/email.service.interface';
import { IContactDataRepository } from '../../../../domains/user/repositories/user.contactData.repository.interface';
export class RequestPasswordResetUseCase {
    constructor(
        private userRepository: IUserRepository,
        private contactDataRepository: IContactDataRepository,
        private tokenService: ITokenService,
        private emailService: IEmailService,
        private resetPasswordRepository: ResetPasswordRepository
    ) {}

    async execute(userId: number): Promise<void> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            // Don't reveal whether user exists → prevent enumeration attacks
            return;
        }

        // Fetch contact data to get the email
        const contactData = await this.contactDataRepository.getContactDataById(user.contact_data_id);
        if (!contactData) {
            // Don't reveal whether contact data exists
            return;
        }

        const resetToken = this.tokenService.generateToken({ userId: user.user_id }, '15m');

        // Save token in the reset password table (do not modify user)
        const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
        await this.resetPasswordRepository.createResetPasswordEntry({
            user_id: user.user_id,
            resetToken,
            resetTokenExpiry,
        });

        // Send email
        const resetLink = `https://yourapp.com/reset-password?token=${resetToken}`;
        await this.emailService.sendMail(contactData.email, 'Password Reset', `Click here: ${resetLink}`);
    }
}
