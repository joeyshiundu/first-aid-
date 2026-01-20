import express, { Request, Response, NextFunction } from 'express';
import { LoginUseCase } from '../../application/usecases/user/authentication management/login-user.use-case';
import { UserRepository } from '../../domains/user/repositories/user.repository';
import { TokenService } from '../../application/services/token.service';
import { z } from 'zod';

const router = express.Router();

// For consistency, this schema should be in a dedicated DTO file like `src/domains/user/dtos/auth.dto.ts`
const LoginSchema = z.object({
  email: z.string().email('Invalid email format.'),
  password: z.string().min(1, 'Password cannot be empty.'),
});

// --- Centralized Dependency Creation ---
const userRepo = new UserRepository();
const tokenService = new TokenService();

// --- Use Case ---
const loginUserUseCase = new LoginUseCase(userRepo, tokenService);

// POST /auth/login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Validate input using Zod schema
    const { email, password } = LoginSchema.parse(req.body);

    // 2. Execute use case with correct parameters
    const result = await loginUserUseCase.execute(email, password);
    res.status(200).json(result);
  } catch (err) {
    // 3. Pass errors to the centralized handler
    next(err);
  }
});

export default router;
