// Update the import path below if the file exists elsewhere, or create the file if missing.

import { IUserRepository } from '../../../../domains/user/repositories/user.repository.interface';
import { ITokenService } from '../../../services/token.service.interface';
import { IEmailService } from '../../../../application/services/email.service.interface';
import { IContactDataRepository } from '../../../../domains/user/repositories/contact-data.repository.interface';

export class RequestPasswordResetUseCase {
    constructor(
        private userRepository: IUserRepository,
        private contactDataRepository: IContactDataRepository,
        private tokenService: ITokenService,
        private emailService: IEmailService
    ) {}

    async execute(userId: number): Promise<void> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            // Don't reveal whether user exists → prevent enumeration attacks
            return;
        }

        // Fetch contact data to get the email
        const contactData = await this.contactDataRepository.findById(user.contact_data_id);
        if (!contactData) {
            // Don't reveal whether contact data exists
            return;
        }

        const resetToken = this.tokenService.generateToken({ userId: user.id }, '15m');

        // Save token in DB or on user entity
        user.resetToken = resetToken;
        user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min
        await this.userRepository.save(user);

        // Send email
        const resetLink = `https://yourapp.com/reset-password?token=${resetToken}`;
        await this.emailService.sendMail(contactData.email, 'Password Reset', `Click here: ${resetLink}`);
    }
}
 