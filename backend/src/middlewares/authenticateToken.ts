import jwt from 'jsonwebtoken';
import { NextFunction, Response } from "express";
import TRequestUserID from "../types/TRequest";
import SERVER from "../utils/messages/serverMessages";
import User from '../models/user';
import prisma from '../config/prisma';


const JWT_SECRET = process.env.JWT_SECRET || "";

export async function authenticateToken(req: TRequestUserID, res: Response, next: NextFunction) {
    const authReq = req.headers.authorization;
    const token = authReq && authReq.split(' ')[1];

    try {
        if (!token) {
            return res.status(401).json({
                message: SERVER.ERR.MISSING_TOKEN
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { sub: string };
        const userExists = await User.findById(decoded.sub);

        if (!userExists) {
            return res.status(404).json({
                message: SERVER.ERR.USER_NOT_FOUND
            });
        }

        const isTokenInvalid = await prisma.invalidToken.findUnique({
            where: { token }
        });

        if (isTokenInvalid) {
            return res.status(401).json({
                message: SERVER.ERR.SESSION_NOT_VALID
            });
        }

        req.userId = decoded.sub;

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {

            return res.status(401).json({
                message: SERVER.ERR.EXPIRED_TOKEN
            });
        }

        console.error(error);
        return res.status(500).json({
            message: SERVER.ERR.INTERNAL_ERROR
        });
    }
}