import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  first_name: z.string().min(1, 'First name is required').optional(),
  last_name: z.string().min(1, 'Last name is required').optional(),
  // Add other updatable fields here.
  // For example, if you add bio and contact data later:
  // phone_number: z.string().optional(),
  // allergies: z.string().optional(),
});

export type UpdateProfileDTO = z.infer<typeof UpdateProfileSchema>;