import { UserEntity } from "domains/user/entities/user.entity";
import { IUserRepository } from "domains/user/repositories/user.repository.interface";

export class UpdateUserProfileUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(userId: number, profileData: Partial<UserEntity>): Promise<UserEntity | null> {
        // Find the user by userId
        const user = await this.userRepository.findByUserId(userId);
        if (!user) {
            return null;
        }

        // Update the user's profile
        Object.assign(user, profileData);
        await this.userRepository.update(user);

        return user;
    }

}