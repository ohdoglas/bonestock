import { NextFunction, Request, Response } from "express";
import SETUP from "../utils/messages/setupMsg";
import isValidUsername from "../utils/validation/validateUsername";
import USER from "../utils/messages/userMessages";
import validateEmail from "../utils/validation/validateEmail";
import validatePassword from "../utils/validation/validatePassword";
import User from "../models/user";
import InitialSetup from "../models/initialSetup";
import SERVER from "../utils/messages/serverMessages";


export default class initSetupMiddleware {
    async authenticate (req: Request, res: Response, next: NextFunction) {
        const { username, email, password, token } = req.body;

        try {
            if (!username || !email || !password || !token) {
                return res.status(400).json({
                    message: SETUP.ERR.MISSING_FIELDS
                });
            }

            const validateUsername = isValidUsername(username);
            if (!validateUsername) {
                return res.status(400).json({
                    message: USER.ERR.INVALID_USERNAME
                });
            }

            const isValidEmail = validateEmail(email);
            if (!isValidEmail) {
                return res.status(400).json({
                    message: USER.ERR.INVALID_EMAIL
                });
            }

            const strongPassword = validatePassword(password);
            if (!strongPassword) {
                return res.status(400).json({
                    message: USER.ERR.WEAK_PASSWORD
                });
            }

            const uniqueEmail = await User.findByEmail(email);
            if (uniqueEmail) {
                return res.status(409).json({
                    message: USER.ERR.NOT_UNIQUE_EMAIL
                });
            }

            const uniqueUsername = await User.findByUsername(username);
            if (uniqueUsername) {
                return res.status(409).json({
                    message: USER.ERR.NOT_UNIQUE_USERNAME
                });
            }

            const setupRecord = await InitialSetup.isSetupComplete();

            if (setupRecord) {
                return res.status(403).json({
                    message: SETUP.SUCCESS.ALREADY_COMPLETED
                });
            }

            const checkToken = await InitialSetup.validateToken(token);

            if (!checkToken) {
                return res.status(401).json({
                    message: SETUP.ERR.INVALID_TOKEN
                });
            }

            next();
        } catch (error) {
            const erro = error as Error;
            console.log(erro);
            return res.status(500).json({
                message: SERVER.ERR.INTERNAL_ERROR
            });
        }
    }
}