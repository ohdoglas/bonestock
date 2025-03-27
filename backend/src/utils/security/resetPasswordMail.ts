import 'dotenv/config';
import nodemailer from "nodemailer"

const PORT = process.env.SERVER_PORT;
const HOST = process.env.ZOHO_SMTP_HOST;
const mailUser = process.env.ZOHO_MAIL_USER;
const mailPass = process.env.ZOHO_MAIL_PASSWORD;

export default async function sendResetPasswordEmail(email: string, token: string) {

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
        subject: 'Redefinição de Senha - Ação Necessária',
        text: `Olá,

    Recebemos uma solicitação para redefinir sua senha. Para continuar, copie o token abaixo e acesse o link para preencher os campos necessários:

    🔑 Token de redefinição: ${token}

    📌 Link para redefinição: http://localhost:${PORT}/reset-password

    Este token expira em 30 minutos. Se não foi você quem solicitou a redefinição, ignore este e-mail.

    Caso tenha dúvidas ou precise de ajuda, entre em contato com nosso suporte.
`,
    };

    try {
        await tranporter.sendMail(mailOptions);
        console.log(`Reset password email sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send reset password email to ${email}`, error);
        throw new Error('Failed to send confirmation email');
    }
}