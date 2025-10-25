import { Request, Response, NextFunction } from 'express';
import { ITokenService } from '../../application/services/token.service.interface';

// Define the shape of your JWT payload for better type safety
interface JwtPayload {
  id: number;
  email: string;
}

// Extend the Express Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
}

export const createAuthMiddleware = (tokenService: ITokenService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const payload = tokenService.verifyAccessToken(token) as JwtPayload | null;

    if (!payload || typeof payload === 'string' || !payload.id) {
      return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
    }

    // Attach user to the request object for subsequent handlers
    req.user = { id: payload.id, email: payload.email }; // Now TypeScript knows payload has .id and .email
    next();
  };
};