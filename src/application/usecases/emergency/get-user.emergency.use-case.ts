import { EmergencyEntity } from "domains/emergency/entities/emergency.entity";
import { IEmergencyRepository } from "domains/emergency/repositories/emergency.repository.interface";

export class GetUserEmergencyLogsUseCase {
    constructor(private emergencyRepository: IEmergencyRepository) {}

    async execute(userId: number): Promise<EmergencyEntity[]> {
        const emergencies = await this.emergencyRepository.findByUserId(userId);
        return emergencies;
    }
}

