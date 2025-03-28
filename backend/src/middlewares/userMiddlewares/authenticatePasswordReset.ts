import { NextFunction, Request, Response } from "express";
import SERVER from "../../utils/messages/serverMessages";
import USER from "../../utils/messages/userMessages";
import PasswordResetToken from "../../models/passwordResetToken";
import validatePassword from "../../utils/validation/validatePassword";
import User from "../../models/user";
import prisma from "../../config/prisma";
import comparePassword from "../../utils/security/hash/unhashPassword";

export default class PasswordResetMiddleware {
    async authenticate(req: Request, res: Response, next: NextFunction) {
        const { token, password, repeatPassword } = req.body;

        try {
            if (!token || !password || !repeatPassword) {
                return res.status(400).json({
                    message: USER.ERR.RESET_PASSWORD_MISSING_FIELDS
                });
            }

            const isValidToken = await PasswordResetToken.isValid(token);
            if (!isValidToken) {
                return res.status(400).json({
                    message: USER.ERR.RESET_PASSWORD_TOKEN_IS_NOT_VALID
                });
            }

            const isUsedToken = await prisma.passwordResetToken.findUnique({
                where: { token },
                select: { used: true }
            });

            if (!isUsedToken) {
                return res.status(400).json({
                    message: USER.ERR.RESET_PASSWORD_TOKEN_IS_NOT_VALID
                });
            }

            if (isUsedToken.used) {
                return res.status(400).json({
                    message: USER.ERR.RESET_PASSWORD_TOKEN_ALREDY_USED
                });
            }

            const isTokenExpired = await PasswordResetToken.isExpired(token);
            if (isTokenExpired) {
                return res.status(400).json({
                    message: USER.ERR.RESET_PASSWORD_TOKEN_IS_EXPIRED
                });
            }

            const userExists = await User.findById(isValidToken.user_id);
            if (!userExists) {
                return res.status(404).json({
                    message: USER.ERR.USER_NOT_FOUND
                });
            }

            if (password !== repeatPassword) {
                return res.status(400).json({
                    message: USER.ERR.RESET_PASSWORD_DOES_NOT_MATCH
                });
            }

            const userPasswordCompare = await prisma.user.findUnique({
                where: { id: isValidToken.user_id },
                select: { password: true }
            });

            if (!userPasswordCompare) {
                return res.status(404).json({
                    message: USER.ERR.USER_NOT_FOUND
                });
            }

            const passwordCompare = await comparePassword(password, userPasswordCompare.password);
            if (passwordCompare) {
                return res.status(400).json({
                    message: USER.ERR.RESET_PASSWORD_OLD_NEW_PASSWORD_MATCH
                });
            }

            const strongPassword = validatePassword(password);
            if (!strongPassword) {
                return res.status(400).json({
                    message: USER.ERR.WEAK_PASSWORD
                });
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: SERVER.ERR.INTERNAL_ERROR
            });
        }
    }
}