export interface ITokenService {
  generateAccessToken(payload: object, expiresIn?: string | number): string;
  verifyAccessToken(token: string): object | null;
  generatePasswordResetToken(payload: object, expiresIn?: string | number): string;
  verifyPasswordResetToken(token: string): object | null;
  decodeToken(token: string): object | null;
}0