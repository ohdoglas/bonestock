import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import TInitialSetup from "../types/TInitialSetup";
import prisma from '../config/prisma';


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

}