import express, { Request, Response, NextFunction } from 'express';
import { RegisterUseCase } from '../../domains/user/dtos/register.use-case';
import { UserRepository } from '../../domains/user/repositories/user.repository';
import { CreateUserSchema } from '../../domains/user/dtos/create-user.dto';

const router = express.Router();

// --- Centralized Dependency Creation ---
const userRepo = new UserRepository();
// The RegisterUseCase now only needs the user repository.
const registerUserUseCase = new RegisterUseCase(userRepo);

// POST /register
const registerHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate request body against the Zod schema
    const userData = CreateUserSchema.parse(req.body);
    // The use case already returns the user profile without the password.
    const newUser = await registerUserUseCase.execute(userData);

    res.status(201).json({ message: 'User registered successfully.', user: newUser });
  } catch (err) {
    next(err); // Pass the error to the centralized error handler
  }
};

router.post('/register', registerHandler);

export default router;
