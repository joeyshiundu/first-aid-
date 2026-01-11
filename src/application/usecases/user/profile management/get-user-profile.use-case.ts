import { UserEntity } from "domains/user/entities/user.entity";
import { IUserRepository } from "domains/user/repositories/user.repository.interface";

export class GetUserProfileUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(userId: number): Promise<Omit<UserEntity, 'password'> | null> {
        const user = await this.userRepository.findByUserId(userId);
        if (!user) {
            return null;
        }
        // Exclude the password before returning the user profile
        const { password, ...userProfile } = user;
        return userProfile;
    }
}
