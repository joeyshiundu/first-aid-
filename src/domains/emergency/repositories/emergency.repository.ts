import {EmergencyEntity} from 'domains/emergency/entities/emergency.entity';
import { IEmergencyRepository } from './emergency.repository.interface';
import { EmergencyLogModel } from '../../../infrastructure/db/models/emergency_log';

export class EmergencyRepository implements IEmergencyRepository {
    async findById(emergencyId: number): Promise<EmergencyEntity | null> {
        const emergency = await EmergencyLogModel.findByPk(emergencyId);
        return emergency ? (emergency.toJSON() as EmergencyEntity) : null;
    }

    async create(emergency: EmergencyEntity): Promise<EmergencyEntity> {
        const newEmergency = await EmergencyLogModel.create(emergency);
        return newEmergency.toJSON() as EmergencyEntity;
    }

    async update(emergency: EmergencyEntity): Promise<EmergencyEntity | null> {
        await EmergencyLogModel.update(emergency, { where: { emergency_id: emergency.emergency_id } });
        const updated = await EmergencyLogModel.findByPk(emergency.emergency_id);
        return updated ? (updated.toJSON() as EmergencyEntity) : null;
    }
    async delete(emergencyId: number): Promise<boolean> {
        const deletedCount = await EmergencyLogModel.destroy({ where: { emergency_id: emergencyId } });
        return deletedCount > 0;
    }

    async findByUserId(userId: number): Promise<EmergencyEntity[]> {
        const emergencies = await EmergencyLogModel.findAll({ where: { user_id: userId } });
        return emergencies.map(e => e.toJSON() as EmergencyEntity);
    }
}