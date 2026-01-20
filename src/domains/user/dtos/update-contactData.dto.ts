import { z } from 'zod';

// Schema for updating contact data. All fields are optional.
export const UpdateContactDataSchema = z.object({
  phone_number: z.string().min(1, 'Phone number is required'),
  email: z.string().email('A valid email is required'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(1, 'Address is required'),
  emergency_contact_name: z.string().min(1, 'Emergency contact name is required'),
  emergency_contact_phonenumber: z.string().min(1, 'Emergency contact phone number is required'),
}).partial(); // .partial() makes all fields optional.

export type UpdateContactDataDto = z.infer<typeof UpdateContactDataSchema>;