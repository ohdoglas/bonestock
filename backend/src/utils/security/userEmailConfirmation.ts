import 'dotenv/config';
import nodemailer from "nodemailer"

const PORT = process.env.SERVER_PORT;
const HOST = process.env.ZOHO_SMTP_HOST;
const mailUser = process.env.ZOHO_MAIL_USER;
const mailPass = process.env.ZOHO_MAIL_PASSWORD;

export default async function sendConfirmationEmail(email: string, token: string) {

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
        subject: 'Importante: Confirme seu Registro de Usuário',
        text: `Por favor, confirme seu registro de usuário clicando no link a seguir: http://localhost:${PORT}/confirm/${token}`,
    }

    try {
        await tranporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send confirmation email to ${email}`, error);
        throw new Error('Failed to send confirmation email');
    }
}