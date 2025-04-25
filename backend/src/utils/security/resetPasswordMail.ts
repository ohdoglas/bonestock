import 'dotenv/config';
import nodemailer from "nodemailer"

const PORT = process.env.SERVER_PORT;
const HOST = process.env.ZOHO_SMTP_HOST;
const mailUser = process.env.ZOHO_MAIL_USER;
const mailPass = process.env.ZOHO_MAIL_PASSWORD;

export default async function sendResetPasswordCompletedEmail(email: string) {

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
        subject: 'Redefinição de Senha - Ação Concluída',
        text: `Olá,

        Sua senha foi redefinida com sucesso! 🔑

        Agora você pode acessar sua conta utilizando a nova senha. Caso não tenha solicitado essa alteração, recomendamos que entre em contato conosco imediatamente para garantir a segurança da sua conta.

        Se tiver qualquer dúvida ou precisar de ajuda adicional, nossa equipe de suporte está à disposição para auxiliá-lo.`,

    };

    try {
        await tranporter.sendMail(mailOptions);
        console.log(`Reset password email sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send reset password email to ${email}`, error);
        throw new Error('Failed to send confirmation email');
    }
}