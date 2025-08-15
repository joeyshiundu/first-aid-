import {IModuleRepository} from './module.repository.interface';
import {ModuleModel} from '../../../infrastructure/db/models/module';
import {ModuleEntity} from '../entities/module.entity';

export class ModuleRepository implements IModuleRepository {
  async findById(moduleId: number): Promise<ModuleEntity | null> {
    const module = await ModuleModel.findByPk(moduleId);
    return module ? (module.toJSON() as ModuleEntity) : null;
  }

  async findByTitle(title: string): Promise<ModuleEntity | null> {
    const moduleRecord = await ModuleModel.findOne({ where: { title } });
    return moduleRecord ? (moduleRecord.toJSON() as ModuleEntity) : null;
  }

  async create(module: ModuleEntity): Promise<ModuleEntity> {
    const newModule = await ModuleModel.create(module);
    return newModule.toJSON() as ModuleEntity;
  }

  async update(module: ModuleEntity): Promise<ModuleEntity> {
    await ModuleModel.update(module, { where: { module_id: module.module_id } });
    const updated = await ModuleModel.findByPk(module.module_id);
    return updated ? (updated.toJSON() as ModuleEntity) : module;
  }

  async delete(moduleId: number): Promise<void> {
    await ModuleModel.destroy({ where: { module_id: moduleId } });
  }
}