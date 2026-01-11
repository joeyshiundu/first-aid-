import { CreateUserDTO } from "domains/user/dtos/create-user.dto";
import { UserEntity } from "domains/user/entities/user.entity";
import { IUserRepository } from "domains/user/repositories/user.repository.interface";
import bcrypt from 'bcrypt';


export class RegisterUseCase {
    constructor(
        private userRepository: IUserRepository,
    ) {}

    async execute(userData: CreateUserDTO): Promise<Omit<UserEntity, 'password'>> {
        // Check if user already exists
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('User with this email already exists.');
        }

        // Hash the password
        const { password: plainTextPassword, ...restOfUserData } = userData;
        const saltRounds = 10; // A standard value for bcrypt
        const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

        // By using a static factory method on the entity, we centralize creation logic.
        const userToCreate = UserEntity.create({ ...restOfUserData, password: hashedPassword });

        const newUser = await this.userRepository.create(userToCreate);

        const { password, ...userProfile } = newUser;
        return userProfile;
    }
}