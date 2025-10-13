import { UserEntity } from "domains/user/entities/user.entity";
import { IUserRepository } from "domains/user/repositories/user.repository.interface";

export class AccountDeactivateUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(userId: number): Promise<UserEntity | null> {
        const user = await this.userRepository.findById(userId);
        if (!user) return null;
        return this.userRepository.deactivate(user);
    }
}