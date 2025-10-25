import { Request, Response, NextFunction } from 'express';
import { InactiveAccountError, InvalidCredentialsError } from '../../application/errors/auth.errors';
import { ZodError } from 'zod';

/**
 * Centralized error handling middleware.
 * This should be the last middleware added to your Express app.
 */
export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log the error for debugging purposes. In a production environment,
  // you might use a more sophisticated logger like Winston or Pino.
  console.error(`Error occurred on ${req.method} ${req.path}:`, err);

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Input validation failed',
      errors: err.flatten().fieldErrors,
    });
  }

  if (err instanceof InvalidCredentialsError) {
    return res.status(401).json({ message: err.message });
  }

  if (err instanceof InactiveAccountError) {
    return res.status(403).json({ message: err.message });
  }

  // Generic fallback for any other unhandled errors
  return res.status(500).json({ message: 'An internal server error occurred.' });
};