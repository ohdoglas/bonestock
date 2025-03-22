import express, { Application } from "express";
import "dotenv/config";
import routes from "./routes/router";
import SETUP from "./utils/messages/setupMsg";
import Role from "./models/roles";
import Permission from "./models/permissions";

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

(
    async () => {
        try {
            await validateEnv();
            await seedDataBase();
            app.use(routes);

        } catch (error) {
            console.error(SETUP.ERR.SEND_EMAIL_FAILED, error);
            throw error;
        }
    }
)();


export default app;
