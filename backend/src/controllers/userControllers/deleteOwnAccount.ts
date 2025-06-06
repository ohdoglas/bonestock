import { NextFunction, Response } from "express";
import TRequestUserID from "../../types/TRequest";
import SERVER from "../../utils/messages/serverMessages";
import User from "../../models/user";
import USER from "../../utils/messages/userMessages";


export default class DeleteOwnUser {
    async controller(req: TRequestUserID, res: Response) {
        const { id } = req.params;
        try {

            await User.delete(id);

            return res.status(200).json({
                message: USER.SUCCESS.OWN_USER_DELETED_SUCCESSFULLY
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