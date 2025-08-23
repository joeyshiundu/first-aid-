export interface ResetPasswordEntity {
    reset_id?: number;
    user_id: number;
    resetToken: string;
    resetTokenExpiry: Date;
}