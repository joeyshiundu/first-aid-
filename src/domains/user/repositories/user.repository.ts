// user.repository.ts

import { IUserRepository } from './user.repository.interface';
import { UserModel } from '../../../infrastructure/db/models/user';
import { UserEntity } from '../entities/user.entity';
import { ContactDataModel } from 'infrastructure/db/models/contact_data';
import { ContactDataEntity } from '../entities/contactData.entity';

export class UserRepository implements IUserRepository {
  async findById(id: number): Promise<UserEntity | null> {
    const user = await UserModel.findByPk(id);
    return user ? (user.toJSON() as UserEntity) : null;
  }
  async findByUserId(userId: number): Promise<UserEntity | null> {
    const userRecord = await UserModel.findOne({ where: { user_id: userId } });
    return userRecord ? (userRecord.toJSON() as UserEntity) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const contact = await ContactDataModel.findOne({ where: { email } });
    if (!contact) return null;
    const user = await UserModel.findOne({ where: { contact_data_id: contact.contact_data_id } });
    return user ? (user.toJSON() as UserEntity) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await UserModel.findAll();
    return users.map(user => user.toJSON() as UserEntity);
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const newUser = await UserModel.create(user);
    return newUser.toJSON() as UserEntity;
  }

  async update(user: UserEntity): Promise<UserEntity> {
    await UserModel.update(user, { where: { user_id: user.user_id } });
    const updated = await UserModel.findByPk(user.user_id);
    return updated ? (updated.toJSON() as UserEntity) : user;
  }

  async deactivate(user: UserEntity): Promise<UserEntity> {
    await UserModel.update({ ...user, status: 'inactive' }, { where: { user_id: user.user_id } });
    const updated = await UserModel.findByPk(user.user_id);
    return updated ? (updated.toJSON() as UserEntity) : { ...user, status: 'inactive' };
  }
  async delete(id: number): Promise<void> {
    await UserModel.destroy({ where: { user_id: id } });
  }
}
