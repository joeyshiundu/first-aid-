import { EmergencyEntity } from 'domains/emergency/entities/emergency.entity';

export interface IEmergencyRepository {
  findById(emergencyId: number): Promise<EmergencyEntity | null>;
  create(emergency: EmergencyEntity): Promise<EmergencyEntity>;
  update(emergency: EmergencyEntity): Promise<EmergencyEntity | null>;
  delete(emergencyId: number): Promise<boolean>;
}