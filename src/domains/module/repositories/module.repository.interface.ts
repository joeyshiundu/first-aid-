import { ModuleEntity } from '../../../domains/module/entities/module.entity';

export interface IModuleRepository {
    findById(moduleId: number): Promise<ModuleEntity | null>;
    findByTitle(title: string): Promise<ModuleEntity | null>;
    create(module: ModuleEntity): Promise<ModuleEntity>;
    update(module: ModuleEntity): Promise<ModuleEntity>;
    delete(moduleId: number): Promise<void>;
    }