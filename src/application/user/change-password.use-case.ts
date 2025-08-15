import { UserEntity } from "domains/user/entities/user.entity";
import { IUserRepository } from "domains/user/repositories/user.repository.interface";
import bcrypt from "bcrypt";

export class ChangePasswordUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(userId: number, oldPassword: string, newPassword: string): Promise<boolean> {
        // Find the user by userId
        const user = await this.userRepository.findByUserId(userId);
        if (!user) {
            return false;
        }

        // Compare the provided old password with the stored hashed password
        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordValid) {
            return false;
        }

        // Hash the new password and update the user
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await this.userRepository.update(user);

        return true;
    }

}