import { IUserRepository } from "domains/user/repositories/user.repository.interface";
import { UserEntity } from "domains/user/entities/user.entity";

export class GetUserByIdUseCase {
    constructor(private userRepository: IUserRepository ){}

    async execute(user_id: number): Promise<UserEntity> {
        const user = await this.userRepository.findById(user_id);
        if (!user) throw new Error("User not found");
        return user;
    }
}