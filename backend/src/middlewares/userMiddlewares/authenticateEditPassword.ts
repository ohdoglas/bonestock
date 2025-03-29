import { NextFunction, Response } from "express";
import SERVER from "../../utils/messages/serverMessages";
import USER from "../../utils/messages/userMessages";
import validatePassword from "../../utils/validation/validatePassword";
import comparePassword from "../../utils/security/hash/unhashPassword";
import TRequestUserID from "../../types/TRequest";
import User from "../../models/user";
import prisma from "../../config/prisma";



export default class EditPasswordMiddleware {
    async authenticate(req: TRequestUserID, res: Response, next: NextFunction) {
        const { oldPassword, newPassword, repeatNewPassword } = req.body;

        try {
            if (
                typeof oldPassword !== "string" ||
                typeof newPassword !== "string" ||
                typeof repeatNewPassword !== "string"
            ) {
                return res.status(400).json({
                    message: USER.ERR.EDIT_PASSWORD_INVALID_INPUT_TYPE
                });
            }

            if (!oldPassword || !newPassword || !repeatNewPassword) {
                return res.status(400).json({
                    message: USER.ERR.EDIT_PASSWORD_MISSING_FIELDS
                });
            }

            const userId = req.userId || "";

            const userExists = await User.findById(userId);
            if(!userExists) {
                return res.status(404).json({
                    message: USER.ERR.USER_NOT_FOUND
                });
            }

            if (!userExists.emailVerified) {
                return res.status(400).json({
                    message: USER.ERR.EMAIL_CONFIRMATION_REQUIRED
                });
            }

            const isActive = await User.isActive(userId);
            if (!isActive) {
                return res.status(400).json({
                    message: USER.ERR.ACCOUNT_NOT_ACTIVE
                });
            }

            const validateOldPassword = await comparePassword(oldPassword, userExists.password);
            if (!validateOldPassword) {
                await EditPasswordMiddleware.delayResponse();
                return res.status(401).json({
                    message: USER.ERR.EDIT_PASSWORD_WRONG_OLD_PASSWORD
                });
            }

            if (newPassword !== repeatNewPassword) {
                return res.status(400).json({
                    message: USER.ERR.EDIT_PASSWORD_REPEAT_PASSWORD_NOT_MATCH
                });
            }

            const userPasswordCompare = await prisma.user.findUnique({
                where: { id: userId },
                select: { password: true }
            });

            if (!userPasswordCompare) {
                return res.status(404).json({
                    message: USER.ERR.USER_NOT_FOUND
                });
            }

            const passwordCompare = await comparePassword(newPassword, userPasswordCompare.password);
            if (passwordCompare) {
                return res.status(400).json({
                    message: USER.ERR.RESET_PASSWORD_OLD_NEW_PASSWORD_MATCH
                });
            }

            const strongPassword = validatePassword(newPassword);
            if (!strongPassword) {
                return res.status(400).json({
                    message: USER.ERR.WEAK_PASSWORD
                });
            }

            next();
        } catch (error) {
            const erro = error as Error;
            console.error(erro);
            return res.status(500).json({
                message: SERVER.ERR.INTERNAL_ERROR
            });
        }
    }

    private static async delayResponse() {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }
}