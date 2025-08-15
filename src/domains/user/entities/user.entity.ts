//This cide defines the UserEntity that represent the user in the system.

export interface UserEntity {
  user_id: number;
  first_name: string;
  last_name: string;
  password: string;
  profile: string | null;
  role: 'patient' | 'responder' | 'admin' | 'certifier';
  is_verified: boolean;
  status: 'active' | 'inactive' | 'suspended';
  bio_data_id: number;
  contact_data_id: number;
  is_certified: boolean;
  cert_id?: number;
  created_on: Date;
}

