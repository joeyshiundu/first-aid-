import { CertificationEntity } from "domains/certification/entities/certification.entity";
import { ICertificationRepository } from "domains/certification/repositories/certification.repository.interface";   
import { where } from "sequelize";

export class DeleteCertificationUseCase {
    constructor(private certificationRepository: ICertificationRepository) {}

    async execute(certificationId: string): Promise<void> {
        await this.certificationRepository.delete(Number(certificationId));
    }
}