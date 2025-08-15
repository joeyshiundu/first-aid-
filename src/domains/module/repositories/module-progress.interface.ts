import { ModuleProgressEntity } from '../entities/module-progress.entity';

export interface IModuleProgressRepository {
  findById(progress_id: number
  ): Promise<ModuleProgressEntity | null>;
  findAll(): Promise<ModuleProgressEntity[]>;
  create(data: ModuleProgressEntity): Promise<ModuleProgressEntity>;
  update(progress: ModuleProgressEntity): Promise<ModuleProgressEntity | null>;
  delete(progressId: number): Promise<boolean>;
}
 