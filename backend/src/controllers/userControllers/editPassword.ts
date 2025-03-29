import { Response } from "express";
import TRequestUserID from "../../types/TRequest";
import SERVER from "../../utils/messages/serverMessages";
import User from "../../models/user";
import USER from "../../utils/messages/userMessages";
import sendEditPasswordCompletedEmail from "../../utils/security/editPasswordMail";

export default class EditPassword {
    async controller(req: TRequestUserID, res: Response) {
        const { newPassword } = req.body;

        try {
            const userId = req.userId || "";
            const userData = await User.findById(userId);

            if (!userData) {
                return res.status(404).json({
                    message: USER.ERR.USER_NOT_FOUND
                });
            }

            await User.updatePassword(userId, newPassword);
            await User.invalidateSessions(userId);
            await sendEditPasswordCompletedEmail(userData.email);

            return res.status(200).json({
                message: USER.SUCCESS.EDIT_PASSWORD_COMPLETED
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