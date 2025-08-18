import { IUserRepository } from "domains/user/repositories/user.repository.interface";
import { UserEntity } from "domains/user/entities/user.entity";

export class DeleteUserUseCase {
    constructor(private userRepository: IUserRepository) {}


    async execute(user_id: number): Promise<void> {
        const user = await this.userRepository.findById(user_id);
        if (!user) throw new Error("User not found");

        await this.userRepository.delete(user.user_id);
    }
}