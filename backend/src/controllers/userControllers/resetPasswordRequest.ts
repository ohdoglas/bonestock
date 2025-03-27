import { Request, Response } from "express";
import SERVER from "../../utils/messages/serverMessages";
import prisma from "../../config/prisma";
import PasswordResetToken from "../../models/passwordResetToken";
import USER from "../../utils/messages/userMessages";
import sendResetPasswordEmail from "../../utils/security/resetPasswordMail";


export default class ResetPasswordRequest {
    async controller(req: Request, res: Response) {
        const { username, email } = req.body;

        try {
            const userData = await prisma.user.findFirst({
                where: {
                    OR: [
                        {email},
                        {username}
                    ]
                }
            });

            if (!userData) {
                return res.status(401).json({
                    message: USER.ERR.INVALID_LOGIN_CREDENTIALS
                });
            }

            const request = await PasswordResetToken.createRequest(userData.id);

            await sendResetPasswordEmail(userData.email, request.token);

            return res.status(200).json({
                message: USER.SUCCESS.RESET_PASSWORD_REQUEST_CREATED
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