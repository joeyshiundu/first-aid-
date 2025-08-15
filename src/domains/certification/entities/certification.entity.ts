

export interface CertificationEntity {
    cert_id: number;
    user_id: number;
    skills?: string; // comma-separated list of skills
    organization ?: string; // organization that issued the certification
    certification_type: string; // e.g., 'first_aid', 'cpr'
    certified: boolean; // indicates if the certification is valid
    issue_date: Date;
    expiry_date: Date | null; // null if the certification does not expire
    status: 'active' | 'expired' | 'revoked';
    is_active: 'active' | 'inactive' | 'suspended'; // status of the certification
    created_on: Date;
    updated_on?: Date; // optional field for tracking updates


}