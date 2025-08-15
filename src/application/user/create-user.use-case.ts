import { CreateUserDTO } from "domains/user/dtos/create-user.dto";
import { UserEntity } from "domains/user/entities/user.entity";
import { IUserRepository } from "domains/user/repositories/user.repository.interface";
import bcrypt from "bcrypt";


export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(data: CreateUserDTO): Promise<UserEntity> {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        // Create a new user entity
        const user : UserEntity = {
            user_id: data.user_id,
            first_name: data.first_name,
            last_name: data.last_name,
            password: hashedPassword,
            profile: data.profile,
            role: data.role,
            is_verified: false,
            status: 'active',
            bio_data_id: data.bio_data_id,
            contact_data_id: data.contact_data_id,
            is_certified: false,
            cert_id: data.cert_id,
            created_on: new Date(),
        };

        // Save the user to the repository
        return await this.userRepository.create(user);
    }
    
}