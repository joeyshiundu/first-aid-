import { CreateUserDTO } from "@domain/user/dtos/create-user.dto";
import { UserEntity } from "@domain/user/entities/user.entity";
import { IUserRepository } from "@domain/user/repositories/user.repository.interface";

export class UpdateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(user_id: number, data: CreateUserDTO): Promise<UserEntity> {
        const user = await this.userRepository.findById(user_id);
        if (!user) throw new Error("User not found");

        Object.assign(user, data);
        await this.userRepository.update(user);
        return user;
    }
}       return user;
        return this.userRepository.update(user);
    }
}