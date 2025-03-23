import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import TInitialSetup from "../types/TInitialSetup";
import prisma from '../config/prisma';
import hash from '../utils/security/hash/passwordHash';
import { generateConfirmationToken } from '../utils/security/token/emailConfirmationToken';
import { Status } from '../utils/enums/status';
import { Roles } from '../utils/enums/roles';
import sendConfirmationEmail from '../utils/security/userEmailConfirmation';


export default class InitialSetup {
    id: ReturnType<typeof uuidv4>;
    setupComplete: boolean;
    private setupToken: string;
    created_at: Date;
    completed_at?: Date;

    constructor (props: TInitialSetup) {
        this.id = props.id || uuidv4();
        this.setupComplete = props.setupComplete;
        this.setupToken = props.setupToken
        this.created_at = props.created_at || new Date();
        this.completed_at = props.completed_at;
    }

    static async generateToken() {
        const token = await crypto.randomBytes(32).toString('hex');
        return token;
    }

    static async validateToken(token: string): Promise<boolean> {
        const check = await prisma.initialSetup.findUnique({
            where: { setupToken: token}
        });
        return check ? true : false;
    }

    static async isSetupComplete(): Promise<boolean> {
        const setupRecord = await prisma.initialSetup.findFirst({
            where: { setupComplete: true }
        });
        return setupRecord ? true : false;
    }

    static async startSetupConfig(token: string) {
        const init = await prisma.initialSetup.create({
            data: {
                setupToken: token,
                setupComplete: false,
                created_at: new Date()
            }
        });
    }

    static async markSetupComplete (token: string) {
        const update = await prisma.initialSetup.update({
            where: { setupToken: token },
            data: {
                setupComplete: true,
                completed_at: new Date()
            }
        });
    }

    static async createAdmin (username: string, email: string, password: string) {
        const hashed = await hash(password);
        const emailConfirmToken = await generateConfirmationToken();

        const newSuperAdmin = await prisma.user.create({
            data: {
                id: uuidv4(),
                username: username,
                email: email,
                password: hashed,
                emailVerified: false,
                confirmationToken: emailConfirmToken,
                created_at: new Date(),
                updated_at: new Date(),
                status: Status.ACTIVE,
                role: Roles.OWNER
            }
        });

        await sendConfirmationEmail(email, emailConfirmToken);

        return newSuperAdmin;
    }
}