import { CertificationEntity } from '../entities/certification.entity';

export interface ICertificationRepository {
    findById(certId: number): Promise<CertificationEntity | null>;
    findByUserId(userId: number): Promise<CertificationEntity[]>;
    create(certification: CertificationEntity): Promise<CertificationEntity>;
    update(certification: CertificationEntity): Promise<CertificationEntity>;
    delete(certId: number): Promise<void>;
}