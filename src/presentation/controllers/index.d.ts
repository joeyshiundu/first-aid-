// This file extends the Express Request interface to include a 'user' property.

declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      email: string;
      // Add any other properties from your JWT payload here
    };
  }
}