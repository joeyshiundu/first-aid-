import { ContactDataEntity } from 'domains/user/entities/contactData.entity';
import { IContactDataRepository } from './user.contactData.repository.interface';
import { ContactDataModel } from 'infrastructure/db/models/contact_data';

export class ContactDataRepository implements IContactDataRepository {
  async createContactData(data: ContactDataEntity): Promise<ContactDataEntity> {
    const createdContactData = await ContactDataModel.create(data);
    return createdContactData.toJSON() as ContactDataEntity;
  }

  async getContactDataById(id: number): Promise<ContactDataEntity | null> {
    const contactData = await ContactDataModel.findByPk(id);
    return contactData ? (contactData.toJSON() as ContactDataEntity) : null;
  }

  async updateContactData(id: number, data: Partial<ContactDataEntity>): Promise<ContactDataEntity | null> {
    const [updatedCount, [updatedContactData]] = await ContactDataModel.update(data, {
      where: { contact_data_id: id },
      returning: true,
    });
    return updatedCount > 0 ? (updatedContactData.toJSON() as ContactDataEntity) : null;
  }

  async deleteContactData(id: number): Promise<boolean> {
    const deletedCount = await ContactDataModel.destroy({
      where: { contact_data_id: id },
    });
    return deletedCount > 0;
  }
}
