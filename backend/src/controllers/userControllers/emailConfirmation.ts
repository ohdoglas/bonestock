import { Request, Response } from "express";
import SERVER from "../../utils/messages/serverMessages";
import User from "../../models/user";
import USER from "../../utils/messages/userMessages";


export default class emailConfirmationController {
    async confirm(req: Request, res: Response) {
        const { token } = req.params;

        try {
            await User.verifyEmail(token);

            return res.status(200).json({
                message: USER.SUCCESS.EMAIL_CONFIRMATION
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