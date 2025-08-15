import { CertificationEntity } from '../entities/certification.entity';
import { ICertificationRepository } from './certification.repository.interface';
import { CertificationDetailsModel } from '../../../infrastructure/db/models/certification_details';

export class CertificationRepository implements ICertificationRepository {
    async findById(certId: number): Promise<CertificationEntity | null> {
        const certification = await CertificationDetailsModel.findByPk(certId);
        return certification ? certification as CertificationEntity : null;
    }

    async findByUserId(userId: number): Promise<CertificationEntity[]> {
        const certifications = await CertificationDetailsModel.findAll({ where: { user_id: userId } });
        return certifications.map(cert => cert as CertificationEntity);
    }

    async create(certification: CertificationEntity): Promise<CertificationEntity> {
        const createdCertification = await CertificationDetailsModel.create(certification);
        return createdCertification as CertificationEntity;
    }

    async update(certification: CertificationEntity): Promise<CertificationEntity> {
        const updatedCertification = await CertificationDetailsModel.update(certification, {
            where: { cert_id: certification.cert_id },
            returning: true,
        });
        return updatedCertification[1][0] as CertificationEntity;
    }

    async delete(certId: number): Promise<void> {
        await CertificationDetailsModel.destroy({ where: { cert_id: certId } });
    }
}