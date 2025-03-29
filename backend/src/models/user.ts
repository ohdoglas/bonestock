import TUser from "../types/TUser";
import { v4 as uuidv4 } from "uuid";
import { Roles } from "../utils/enums/roles";
import { Status } from "../utils/enums/status";
import hash from "../utils/security/hash/passwordHash";
import { generateConfirmationToken } from "../utils/security/token/emailConfirmationToken";
import prisma from "../config/prisma";
import sendConfirmationEmail from "../utils/security/userEmailConfirmation";
import SERVER from "../utils/messages/serverMessages";

export default class User {
    readonly id: string;
    username: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    last_login?: Date;
    status: Status;
    role: Roles;
    confirmationToken?: string;
    emailVerified: boolean;

    constructor(props: {
        id: string;
        username: string;
        email: string;
        created_at: Date;
        updated_at: Date;
        status: Status;
        role: Roles;
        confirmationToken?: string;
        emailVerified: boolean;
    }) {
        this.id = props.id;
        this.username = props.username;
        this.email = props.email;
        this.created_at = props.created_at;
        this.updated_at = props.updated_at;
        this.status = props.status;
        this.role = props.role;
        this.confirmationToken = props.confirmationToken;
        this.emailVerified = props.emailVerified;
    }

    static async hashPassword(password: string): Promise<string> {
        return await hash(password);
    }

    static async generateEmailToken(): Promise<string> {
        return await generateConfirmationToken();
    }

    static async create(user: { username: string; email: string; password: string }, initialStatus: Status, selectedRole: Roles) {
        try {
            const hashedPassword = await this.hashPassword(user.password);
            const emailConfirmToken = await this.generateEmailToken();

            const newUser = await prisma.user.create({
                data: {
                    id: uuidv4(),
                    username: user.username,
                    email: user.email,
                    password: hashedPassword,
                    emailVerified: false,
                    confirmationToken: emailConfirmToken,
                    created_at: new Date(),
                    updated_at: new Date(),
                    status: initialStatus,
                    role: selectedRole
                }
            });

            await sendConfirmationEmail(user.email, emailConfirmToken);

            return new User({
                ...newUser,
                status: newUser.status as Status,
                role: newUser.role as Roles,
                confirmationToken: newUser.confirmationToken ?? undefined,
            });

        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
    }

    static async updatePassword(user_id: string, newPassword: string) {
        try {
            const hashedPassword = await User.hashPassword(newPassword);
            await prisma.user.update({
                where: { id: user_id },
                data: {
                    password: hashedPassword,
                    updated_at: new Date()
                }
            });
        } catch (error) {
            console.error("Error updating password:", error);
            throw new Error("Failed to update password");
        }
    }

    static async findConfirmationToken(token: string) {
        return await prisma.user.findUnique({
            where: { confirmationToken: token },
            select: { emailVerified: true }
        });
    }

    static async findById(id: string) {
        const find = await prisma.user.findUnique({
            where: { id: id }
        });

        if (!find) {
            return null;
        }

        return find;
    }

    static async findByUsername(username: string) {
        const find = await prisma.user.findUnique({
            where: { username: username}
        });

        if (!find) {
            return null;
        }

        return find;
    }

    static async findByEmail(email: string) {
        const find = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!find) {
            return null;
        }

        return find;
    }

    static async isActive(id: string): Promise<boolean> {
        const active = await prisma.user.findUnique({
            where: { id: id }
        });

        if (!active) {
            return false;
        }

        return active.status === Status.ACTIVE;
    }

    static async isVerified(id: string) {
        const verified = await prisma.user.findUnique({
            where: { id: id }
        });

        if (!verified) {
            return false;
        }

        return verified.emailVerified === true;
    }

    static async verifyEmail(token: string) {
        await prisma.user.update({
            where: { confirmationToken: token },
            data: {
                emailVerified: true
            }
        });
    }

    static async updateLastLogin (email: string) {
        await prisma.user.update({
            where: { email: email },
            data: {
                last_login: new Date()
            }
        })
    }
}