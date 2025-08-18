import { IUserRepository } from "domains/user/repositories/user.repository.interface"; 
import { UserEntity } from "domains/user/entities/user.entity";

export class GetAllUsersUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(): Promise<UserEntity[]> {
        return this.userRepository.findAll();
    }
}
