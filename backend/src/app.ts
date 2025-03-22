import express, { Application } from "express";
import "dotenv/config";
import routes from "./routes/router";
import SETUP from "./utils/messages/setupMsg";

const adminMail = process.env.ADMIN_MAIL;
const app: Application = express();

app.use(express.json());
async function validateEnv() {
    if (!adminMail) {
        throw new Error(SETUP.ERR.MISSING_MAIL_ENV)
    };
};

(
    async () => {
        try {
            await validateEnv();

        } catch (error) {
            console.error(SETUP.ERR.SEND_EMAIL_FAILED, error);
            throw error;
        }
    }
)

app.use(routes);

export default app;
