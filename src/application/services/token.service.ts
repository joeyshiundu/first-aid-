import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { ITokenService } from "./token.service.interface";

dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "your_default_access_secret";
const JWT_RESET_SECRET = process.env.JWT_RESET_SECRET || "your_default_reset_secret";

export class TokenService implements ITokenService {

  generateAccessToken(payload: object, expiresIn: SignOptions["expiresIn"] = "1h"): string {
    return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn });
  }

  verifyAccessToken(token: string): object | null {
    try {
      return jwt.verify(token, JWT_ACCESS_SECRET) as object;
    } catch {
      return null;
    }
  }

  generatePasswordResetToken(payload: object, expiresIn: SignOptions["expiresIn"] = "15m"): string {
    return jwt.sign(payload, JWT_RESET_SECRET, { expiresIn });
  }

  verifyPasswordResetToken(token: string): object | null {
    try {
      return jwt.verify(token, JWT_RESET_SECRET) as object;
    } catch {
      return null;
    }
  }

  /**
   * @deprecated Use specific verification methods like verifyAccessToken or verifyPasswordResetToken instead.
   */
  verifyToken(token: string): object | null {
    return this.verifyAccessToken(token); // Default to access token verification for backward compatibility if needed
  }

  decodeToken(token: string): object | null {
    try {
      return jwt.decode(token) as object;
    } catch {
      return null;
    }
  }
}
