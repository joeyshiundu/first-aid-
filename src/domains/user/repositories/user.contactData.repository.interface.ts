import { ContactDataEntity } from 'domains/user/entities/contactData.entity';

export interface IContactDataRepository {
  createContactData(data: ContactDataEntity): Promise<ContactDataEntity>;
  getContactDataById(id: number): Promise<ContactDataEntity | null>;
  updateContactData(id: number, data: Partial<ContactDataEntity>): Promise<ContactDataEntity | null>;
  deleteContactData(id: number): Promise<boolean>;
}