import { v4 as uuidv4 } from "uuid"
import TResetPasswordToken from "../types/TPasswordResetToken";
import crypto from 'crypto';
import prisma from "../config/prisma";

export default class PasswordResetToken {
    id: ReturnType<typeof uuidv4>;
    user_id: ReturnType<typeof uuidv4>;
    private token: string;
    expires_at?: Date;
    used: boolean;

    constructor(props: TResetPasswordToken) {
        this.id = props.id || uuidv4();
        this.user_id = props.user_id;
        this.token = props.token;
        this.expires_at = props.expires_at
        this.used = false;
    }

    static async generateToken():Promise<string> {
        const string = crypto.randomBytes(32).toString('hex');
        return string;
    }

    isExpired(token: string) {
        return this.expires_at !== undefined && this.expires_at < new Date();
    }

    static async isValid(token: string) {
        const tokenExists = await prisma.passwordResetToken.findUnique({
            where: {
                token: token
            }
        });

        if (!tokenExists) {
            return false;
        }

        return tokenExists;
    }

    static async markAsUsed(token: string): Promise<void> {
        const useToken = await prisma.passwordResetToken.update({
            where: {
                token: token
            },
            data: {
                used: true
            }
        })
    }

    static async createRequest(user_id: string) {
        const token = await this.generateToken();
        const request = await prisma.passwordResetToken.create({
            data: {
                id: uuidv4(),
                user_id: user_id,
                token: token,
                expires_at: new Date(Date.now() + 30 * 60 * 1000),
                used: false,
            }
        });

        return request;
    }

}