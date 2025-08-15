import { ModuleProgressEntity } from '../entities/module-progress.entity';
import { IModuleProgressRepository } from './module-progress.interface'
import { ModuleProgressModel } from '../../../infrastructure/db/models/module_progress';

export class ModuleProgressRepository implements IModuleProgressRepository {
    async findById(progressId: number): Promise<ModuleProgressEntity | null> {
        const progress = await ModuleProgressModel.findByPk(progressId);
        return progress ? (progress.toJSON() as ModuleProgressEntity) : null;
    }

    async findAll(): Promise<ModuleProgressEntity[]> {
        const progresses = await ModuleProgressModel.findAll();
        return progresses.map(progress => progress.toJSON() as ModuleProgressEntity);
    }
    
    async findByUserId(userId: number): Promise<ModuleProgressEntity[]> {
        const progresses = await ModuleProgressModel.findAll({ where: { user_id: userId } });
        return progresses.map(progress => progress.toJSON() as ModuleProgressEntity);
    }

    async create(progress: ModuleProgressEntity): Promise<ModuleProgressEntity> {
        const newProgress = await ModuleProgressModel.create(progress);
        return newProgress.toJSON() as ModuleProgressEntity;
    }

    async update(progress: ModuleProgressEntity): Promise<ModuleProgressEntity> {
        await ModuleProgressModel.update(progress, { where: { progress_id: progress.progress_id } });
        const updated = await ModuleProgressModel.findByPk(progress.progress_id);
        return updated ? (updated.toJSON() as ModuleProgressEntity) : progress;
    }

    async delete(progressId: number): Promise<boolean> {
        const deletedCount = await ModuleProgressModel.destroy({ where: { progress_id: progressId } });
        return deletedCount > 0;
    }
}