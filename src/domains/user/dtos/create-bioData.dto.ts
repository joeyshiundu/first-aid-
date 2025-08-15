export interface CreateBioDataDto {
    bio_data_id: number;
    blood_group: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    age: number;
    allergies: string;
    weight: number;
    gender: 'M' | 'F';
    height: number;
    d_o_b: Date;
}