// This file contains the CreateUserDTO interface which defines the structure for creating a new user in the system.
// It includes fields for the user's first name, last name, password, role, and references
export interface CreateUserDTO {
  user_id: number;
  first_name: string;
  last_name: string;
  password: string;
  profile: string | null;
  role: 'patient' | 'responder' | 'admin' | 'certifier';
  bio_data_id: number;
  contact_data_id: number;
  cert_id?: number;

}
