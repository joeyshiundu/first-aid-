import express, { Request, Response, NextFunction } from 'express';
import { LoginUseCase } from '../../application/usecases/user/authentication management/login-user.use-case';
import { UserRepository } from '../../domains/user/repositories/user.repository';
import { TokenService } from '../../application/services/token.service';

const router = express.Router();

// --- Centralized Dependency Creation ---
const userRepo = new UserRepository();
const tokenService = new TokenService();
const loginUseCase = new LoginUseCase(userRepo, tokenService);

// POST /auth/login
const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const result = await loginUseCase.execute(email, password);
    res.json(result);
  } catch (err) {
    next(err); // Pass the error to the centralized error handler
  }
};

router.post('/login', loginHandler);

export default router;
