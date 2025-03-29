import 'dotenv/config';
import nodemailer from "nodemailer"

const PORT = process.env.SERVER_PORT;
const HOST = process.env.ZOHO_SMTP_HOST;
const mailUser = process.env.ZOHO_MAIL_USER;
const mailPass = process.env.ZOHO_MAIL_PASSWORD;

export default async function sendEditPasswordCompletedEmail(email: string) {

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
        subject: '🔒 Sua senha foi alterada com sucesso!',
        text: `Olá,

A senha da sua conta foi alterada com sucesso. 🎉

Se foi você quem realizou essa alteração, não há com o que se preocupar. Caso não tenha solicitado essa mudança, recomendamos que entre em contato conosco imediatamente para garantir a segurança da sua conta.

Se precisar de ajuda ou tiver dúvidas, nossa equipe de suporte está à disposição.`,

    };

    try {
        await tranporter.sendMail(mailOptions);
        console.log(`Reset password email sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send reset password email to ${email}`, error);
        throw new Error('Failed to send confirmation email');
    }
}