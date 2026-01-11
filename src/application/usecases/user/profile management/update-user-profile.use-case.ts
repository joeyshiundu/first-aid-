import { UserEntity } from "domains/user/entities/user.entity";
import { IUserRepository } from "domains/user/repositories/user.repository.interface";

export class UpdateUserProfileUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(userId: number, profileData: Partial<UserEntity>): Promise<Omit<UserEntity, 'password'> | null> {
        // Find the user by userId
        const user = await this.userRepository.findByUserId(userId);
        if (!user) {
            return null;
        }

        // Ensure password is not updated through this use case for security.
        const { password, ...updatableProfileData } = profileData;

        // Update the user's profile
        Object.assign(user, updatableProfileData);
        await this.userRepository.update(user);

        // Exclude the password from the return value for consistency and security.
        const { password: _, ...userProfile } = user;
        return userProfile;
    }

}