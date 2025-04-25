import { NextFunction, Request, Response } from "express";
import SERVER from "../../utils/messages/serverMessages";
import USER from "../../utils/messages/userMessages";
import prisma from "../../config/prisma";
import User from "../../models/user";


export default class ResetPasswordRequestMiddleware {
    async authenticate(req: Request, res: Response, next: NextFunction) {
        const { username, email } = req.body;

        try {
            if (!username && !email) {
                return res.status(400).json({
                    message: USER.ERR.RESET_PASSWORD_REQUEST_MISSING_FIELDS
                });
            }

            const userExists = await prisma.user.findFirst({
                where: {
                    OR: [
                        {email},
                        {username}
                    ]
                }
            });
            if (!userExists) {
                return res.status(401).json({
                    message: USER.ERR.INVALID_LOGIN_CREDENTIALS
                })
            }

            const isActive = await User.isActive(userExists.id);
            if (!isActive) {
                return res.status(400).json({
                    message: USER.ERR.ACCOUNT_NOT_ACTIVE
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
}