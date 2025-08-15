export interface UpdateContactDataDto {
    contact_data_id: number;
    phone_number: string;
    email: string;
    country: string;
    city: string;
    emergency_contact_name: string;
    emergency_contact_phonenumber: string;
    address: string;
}