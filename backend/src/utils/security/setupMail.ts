import 'dotenv/config';
import nodemailer from 'nodemailer';

const PORT = process.env.PORT;
const HOST = process.env.ZOHO_SMTP_HOST;
const mailUser = process.env.ZOHO_MAIL_USER;
const mailPass = process.env.ZOHO_MAIL_PASSWORD;

export default async function sendSetupMail(email: string, token: string) {

    const tranporter = nodemailer.createTransport({
        host: HOST,
        port: 465,
        secure: true,
        auth: {
            user: mailUser,
            pass: mailPass
        }
    });

    const mailOptions = {
        from: mailUser,
        to: email,
        subject: 'Important: Initial Setup (Super Admin token)',
        text: `Use the following token for initial configuration and acquisition of Super Admin credentials.
        Token: ${token}`
    }

    try {
        await tranporter.sendMail(mailOptions);
        console.log(`Initial setup email sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send setup email to ${email}`, error);
        throw new Error('Failed to send setup email');
    }
}