import { CreateUserDTO } from "domains/user/dtos/create-user.dto";
import { UserEntity } from "domains/user/entities/user.entity";
import { IUserRepository } from "domains/user/repositories/user.repository.interface";
import bcrypt from "bcrypt";


export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(data: CreateUserDTO): Promise<UserEntity> {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        // The bio_data_id and contact_data_id are required but optional in the DTO.
        // This implies they should be created and passed in by a higher-level use case (e.g., RegisterUseCase)
        // before this use case is called. We'll assert they exist for type safety.
        if (data.bio_data_id === undefined || data.contact_data_id === undefined) {
            throw new Error("bio_data_id and contact_data_id must be provided to create a user.");
        }

        const userToCreate: Omit<UserEntity, 'user_id' | 'resetToken' | 'resetTokenExpiry'> = {
            first_name: data.first_name,
            last_name: data.last_name,
            password: hashedPassword,
            profile: data.profile ?? null,
            role: data.role,
            is_verified: false,
            status: 'active',
            bio_data_id: data.bio_data_id,
            contact_data_id: data.contact_data_id,
            is_certified: false,
            cert_id: data.cert_id ?? undefined,
            created_on: new Date(),
        };

        // Save the user to the repository
        return await this.userRepository.create(userToCreate as UserEntity);
    }
    
}