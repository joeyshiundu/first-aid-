import { CreateUserDTO } from "domains/user/dtos/create-user.dto";
import { UserEntity } from "domains/user/entities/user.entity";
import { IUserRepository } from "domains/user/repositories/user.repository.interface"
import { ITokenService } from "application/services/token.service.interface";
import bcrypt from "bcrypt";

// This statement strips the password field from the UserEntity type. Thus avoiding a potential security risk and a type error
type SafeUserEntity = Omit<UserEntity, 'password'>;

export class LoginUseCase {
    constructor(private userRepository: IUserRepository, private tokenService: ITokenService) {}

    async execute(userId: number, password: string): Promise<{ user: SafeUserEntity; token: string } | null> {
        // Find the user by userId
        const user = await this.userRepository.findByUserId(userId);
        if (!user) {
            return null;
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }

        // Return the user entity without the password
        const { password: _, ...userWithoutPassword } = user;
        const token = this.tokenService.generateToken({ userId: user.user_id });
        return { user: userWithoutPassword, token };
    }

}