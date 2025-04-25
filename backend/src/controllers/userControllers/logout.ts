import { Response } from "express";
import TRequestUserID from "../../types/TRequest";
import SERVER from "../../utils/messages/serverMessages";
import InvalidToken from "../../models/invalidToken";
import prisma from "../../config/prisma";

export default class AuthController {
    async logout(req: TRequestUserID, res: Response) {
        const authReq = req.headers.authorization;
        const token = authReq && authReq.split(' ')[1];
        try {
            if (!token) {
                return res.status(400).json({
                    message: SERVER.ERR.MISSING_TOKEN
                });
            }
            if (!req.userId) {
                return res.status(400).json({
                    message: SERVER.ERR.UNAUTHORIZED_USER
                });
            }

            const tokenInvalidated = await prisma.invalidToken.findUnique({
                where: { token }
            });
            if (tokenInvalidated) {
                return res.status(401).json({
                    message: SERVER.ERR.TOKEN_ALREADY_INVALID
                });
            }

            await InvalidToken.create(req.userId, token);

            return res.status(200).json({
                message: SERVER.SUCCESS.LOGOUT_SUCCESSFUL
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