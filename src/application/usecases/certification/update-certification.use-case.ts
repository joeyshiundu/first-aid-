import { CertificationEntity } from "domains/certification/entities/certification.entity";
import { ICertificationRepository } from "domains/certification/repositories/certification.repository.interface";

export class UpdateCertificationUseCase {
    constructor(private certificationRepository: ICertificationRepository) {}

    async execute(certificationId: string, certificationData: CertificationEntity): Promise<CertificationEntity> {
        const updatedCertification = await this.certificationRepository.update({
            ...certificationData,
            cert_id: Number(certificationId)
        });
        return updatedCertification;
    }
}