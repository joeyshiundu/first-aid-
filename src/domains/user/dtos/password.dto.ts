import { z } from 'zod';

export const RequestPasswordResetSchema = z.object({
  email: z.string().email({ message: 'A valid email is required.' }),
});

export const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(1, { message: 'Old password is required.' }),
  newPassword: z.string().min(8, { message: 'New password must be at least 8 characters long.' }),
});

export const PerformPasswordResetSchema = z.object({
  token: z.string().min(1, { message: 'Reset token is required.' }),
  newPassword: z.string().min(8, { message: 'New password must be at least 8 characters long.' }),
});