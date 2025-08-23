
import { IEmailService } from "./email.service.interface";
import nodemailer from "nodemailer";

export class EmailService implements IEmailService {
    async sendMail(to: string, subject: string, body: string): Promise<void> {
        // Configure the transporter (use environment variables for real projects)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.example.com',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER || 'user@example.com',
                pass: process.env.SMTP_PASS || 'password',
            },
        });

        await transporter.sendMail({
            from: process.env.SMTP_FROM || 'no-reply@example.com',
            to,
            subject,
            text: body,
        });
    }
}