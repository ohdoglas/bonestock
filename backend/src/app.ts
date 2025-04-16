import express, { Application } from "express";
import "dotenv/config";
import routes from "./routes/router";
import SETUP from "./utils/messages/setupMsg";
import Role from "./models/roles";
import Permission from "./models/permissions";
import InitialSetup from "./models/initialSetup";
import sendSetupMail from "./utils/security/setupMail";

const adminMail = process.env.ADMIN_MAIL;
const app: Application = express();

app.use(express.json());
async function validateEnv() {
    if (!adminMail) {
        throw new Error(SETUP.ERR.MISSING_MAIL_ENV)
    };
};


async function seedDataBase() {
    try {
        const createdRoles = await Role.seed();
        const createdPermissions = await Permission.seed();

        console.log(`Roles created: ${createdRoles}`);
        console.log(`Permissions created: ${createdPermissions}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function checkInitialSetup() {
    try {
        const setupComplete = await InitialSetup.isSetupComplete();

        if (!setupComplete) {
            const token = await InitialSetup.generateToken();

            await InitialSetup.startSetupConfig(token);

            if (adminMail) {
                await sendSetupMail(adminMail, token);
            }
        }
    } catch (error) {
        console.error(SETUP.ERR.SEND_EMAIL_FAILED, error);
        throw error;
    }
}

(
    async () => {
        try {
            await validateEnv();
            await seedDataBase();
            await checkInitialSetup();

            app.use(routes);

        } catch (error) {
            console.error(SETUP.ERR.SEND_EMAIL_FAILED, error);
            throw error;
        }
    }
)();

export default app;
