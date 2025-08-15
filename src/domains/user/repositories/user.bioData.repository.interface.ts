import { BioDataEntity } from 'domains/user/entities/bioData.entity';

export interface IBioDataRepository {
  createBioData(data: BioDataEntity): Promise<BioDataEntity>;
  getBioDataById(id: number): Promise<BioDataEntity | null>;
  updateBioData(id: number, data: Partial<BioDataEntity>): Promise<BioDataEntity | null>;
  deleteBioData(id: number): Promise<boolean>;
}
