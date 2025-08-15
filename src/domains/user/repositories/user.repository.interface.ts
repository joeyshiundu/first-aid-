//
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
    findById(userId: number): Promise<UserEntity | null>; 
    findByUserId(user_id : number): Promise<UserEntity | null>;
    findAll(): Promise<UserEntity[]>;
    create(user: UserEntity): Promise<UserEntity>;
    update(user: UserEntity): Promise<UserEntity>;
    delete(userId: number): Promise<void>;
}