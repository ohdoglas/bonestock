import { Request, Response } from "express";
import SERVER from "../../utils/messages/serverMessages";
import PasswordResetToken from "../../models/passwordResetToken";
import User from "../../models/user";
import prisma from "../../config/prisma";
import USER from "../../utils/messages/userMessages";
import sendResetPasswordCompletedEmail from "../../utils/security/resetPasswordMail";


export default class ResetPassword {
    async controller(req: Request, res: Response) {
        const { token, password } = req.body;

        try {
            const findUser = await prisma.passwordResetToken.findUnique({
                where: { token: token },
                select: { user_id: true }
            });

            await prisma.passwordResetToken.updateMany({
                where: {
                    user_id: findUser!.user_id,
                    used: false,
                    token: { not: token },
                },
                data: {
                    used: true,
                }
            });

            await PasswordResetToken.markAsUsed(token);

            await User.updatePassword(findUser!.user_id, password);

            const userEmail = await prisma.user.findUnique({
                where: { id: findUser?.user_id },
                select: { email: true }
            });
            await sendResetPasswordCompletedEmail(userEmail!.email);

            return res.status(200).json({
                message: USER.SUCCESS.RESET_PASSWORD_COMPLETED
            });
        } catch (error) {
            const erro = error as Error;
            console.error(erro);
            return res.status(500).json({
                message: SERVER.ERR.INTERNAL_ERROR
            });
        }
    }
}