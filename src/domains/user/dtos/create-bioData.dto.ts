import { z } from 'zod';

export const CreateBioDataSchema = z.object({
  blood_group: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  age: z.number().int().positive(),
  allergies: z.string().optional(),
  weight: z.number().positive(),
  gender: z.enum(['M', 'F']),
  height: z.number().positive(),
  d_o_b: z.coerce.date(),
});

export type CreateBioDataDto = z.infer<typeof CreateBioDataSchema>;