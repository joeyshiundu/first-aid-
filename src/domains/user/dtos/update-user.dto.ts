
export interface updateUserDTO {
    user_id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
    is_active?: boolean;
    created_at?: Date;
    updated_at?: Date;
}