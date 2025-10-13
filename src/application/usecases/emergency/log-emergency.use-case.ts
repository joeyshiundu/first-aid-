import { EmergencyEntity } from "domains/emergency/entities/emergency.entity";
import { IEmergencyRepository } from "domains/emergency/repositories/emergency.repository.interface";

export class LogEmergencyUseCase {
    constructor(private emergencyRepository: IEmergencyRepository) {}

    async execute(emergencyData: EmergencyEntity): Promise<EmergencyEntity> {
        const loggedEmergency = await this.emergencyRepository.create(emergencyData);
        return loggedEmergency;
    }
}