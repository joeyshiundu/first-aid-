import express, { Request, Response, NextFunction } from 'express';
import { RequestPasswordResetUseCase } from '../../application/usecases/user/authentication management/reset-password.use-case';
import { PerformPasswordResetUseCase } from '../../application/usecases/user/authentication management/perform-reset-password.use-case';
import { ChangePasswordUseCase } from '../../application/usecases/user/authentication management/change-password.use-case';
import { UserRepository } from '../../domains/user/repositories/user.repository';
import { TokenService } from '../../application/services/token.service';
import { EmailService } from '../../application/services/email.service';
import { ResetPasswordRepository } from '../../domains/user/repositories/user.resetPassword.repository';
import { createAuthMiddleware } from '../middleware/auth.middleware';
import { ChangePasswordSchema, PerformPasswordResetSchema, RequestPasswordResetSchema } from '../../domains/user/dtos/password.dto';

const router = express.Router();

// --- Centralized Dependency Creation ---
const userRepo = new UserRepository();
const tokenService = new TokenService();
const emailService = new EmailService();
const resetRepo = new ResetPasswordRepository();
const authMiddleware = createAuthMiddleware(tokenService);

// --- Use Cases ---
const requestPasswordResetUseCase = new RequestPasswordResetUseCase(userRepo, tokenService, emailService, resetRepo);
const changePasswordUseCase = new ChangePasswordUseCase(userRepo);
const performPasswordResetUseCase = new PerformPasswordResetUseCase(userRepo, resetRepo, tokenService);

// POST /password/request
router.post('/request', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = RequestPasswordResetSchema.parse(req.body);

    await requestPasswordResetUseCase.execute(email);
    res.status(200).json({ message: 'If the account exists, a reset email has been sent.' });
  } catch (err) {
    next(err);
  }
});

// POST /password/change
// This route is now protected by the authMiddleware
router.post('/change', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  // Safely access the user ID. This is more robust and avoids potential runtime errors.
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized: User ID missing from token.' });

  try {
    const { oldPassword, newPassword } = ChangePasswordSchema.parse(req.body);
    await changePasswordUseCase.execute(userId, oldPassword, newPassword);
    // The use case will now throw an error on failure, which is caught below.
    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (err) {
    next(err);
  }
});

router.post('/reset', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, newPassword } = PerformPasswordResetSchema.parse(req.body);
    // Refactored use case will throw on failure instead of returning false.
    await performPasswordResetUseCase.execute(token, newPassword);
    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    next(err);
  }
});

export default router;