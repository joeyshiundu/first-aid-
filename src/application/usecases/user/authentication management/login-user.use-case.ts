//import { CreateUserDTO } from "domains/user/dtos/create-user.dto";  (Didnt need this import)
import type { UserEntity } from "@domain/user/entities/user.entity";
import type { IUserRepository } from "@domain/user/repositories/user.repository.interface";
import { InvalidCredentialsError, InactiveAccountError } from "@application/errors/auth.errors";
import type { ITokenService } from "@application/services/token.service.interface";
import bcrypt from "bcrypt";

// This statement creates a new type that removes the password field from the user entity.
type SafeUserEntity = Omit<UserEntity, 'password'>;
//Use case class for logging in a user account
export class LoginUseCase {
    // Dependency injection of user repository and token service
    constructor(private userRepository: IUserRepository, private tokenService: ITokenService) {}

    async execute(email: string, password: string): Promise<{ user: SafeUserEntity; token: string } | null> {
        // Find the user by email
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new InvalidCredentialsError('Invalid email or password.');  // throw error from the auth errors file
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new InvalidCredentialsError('Invalid email or password.'); // throw error from the auth errors file
        }

        // Check if the user's account is active
        if (user.status !== 'active') {
            throw new InactiveAccountError('User account is not active.'); // throw error from the auth errors file
        }

        // Return the user entity without the password
        const { password: _, ...userWithoutPassword } = user;
        const token = this.tokenService.generateAccessToken({ id: user.user_id, email: email });
        return { user: userWithoutPassword, token };    
    }

}