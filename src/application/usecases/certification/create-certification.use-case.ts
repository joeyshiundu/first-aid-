import { CertificationEntity } from "domains/certification/entities/certification.entity";
import { ICertificationRepository } from "domains/certification/repositories/certification.repository.interface";

export class CreateCertificationUseCase {
    constructor(private certificationRepository: ICertificationRepository) {}

    async execute(certificationData: CertificationEntity): Promise<CertificationEntity> {
        const newCertification = await this.certificationRepository.create(certificationData);
        return newCertification;
    }
}