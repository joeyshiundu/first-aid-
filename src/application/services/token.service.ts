import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { ITokenService } from "./token.service.interface";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";

export class TokenService implements ITokenService {

  generateToken(payload: object, expiresIn: SignOptions["expiresIn"] = "1h"): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  }

  verifyToken(token: string): object | null {
    try {
      return jwt.verify(token, JWT_SECRET) as object;
    } catch {
      return null;
    }
  }

  decodeToken(token: string): object | null {
    try {
      return jwt.decode(token) as object;
    } catch {
      return null;
    }
  }
}
