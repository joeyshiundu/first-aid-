import {  BioDataEntity } from 'domains/user/entities/bioData.entity';
import { IBioDataRepository } from './user.bioData.repository.interface';
import { BioDataModel } from 'infrastructure/db/models/bio_data';

export class UserBioDataRepository implements IBioDataRepository {
  async createBioData(data: BioDataEntity): Promise<BioDataEntity> {
    const bioData = await BioDataModel.create(data);
    return bioData.toJSON() as BioDataEntity;
  }

  async getBioDataById(id: number): Promise<BioDataEntity | null> {
    const bioData = await BioDataModel.findByPk(id);
    return bioData ? (bioData.toJSON() as BioDataEntity) : null;
  }

  async updateBioData(id: number, data: Partial<BioDataEntity>): Promise<BioDataEntity | null> {
    const [updatedCount, updatedRows] = await BioDataModel.update(data, {
      where: { bio_data_id: id },
      returning: true,
    });
    return updatedCount > 0 ? (updatedRows[0].toJSON() as BioDataEntity) : null;
  }

  async deleteBioData(id: number): Promise<boolean> {
    const deletedCount = await BioDataModel.destroy({ where: { bio_data_id: id } });
    return deletedCount > 0;
  }
}