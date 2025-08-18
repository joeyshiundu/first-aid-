export interface ITokenService {
  generateToken(payload: object, expiresIn?: string | number): string;
  verifyToken(token: string): object | null;
  decodeToken(token: string): object | null;
}0