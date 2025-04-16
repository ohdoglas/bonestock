import { NextFunction, Response } from "express";
import TRequestUserID from "../../types/TRequest";
import SERVER from "../../utils/messages/serverMessages";
import USER from "../../utils/messages/userMessages";
import { validate as isValid } from "uuid";
import User from "../../models/user";
import Permission from "../../models/permissions";
import Role from "../../models/roles";



export default class DeleteUserMiddleware {
    async authenticate(req: TRequestUserID, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {

            if (!id) {
                return res.status(400).json({
                    message: USER.ERR.MISSING_USER_ID
                });
            }

            if (!isValid(id)) {
                return res.status(401).json({
                    message: USER.ERR.INVALID_UUID_FORMAT
                });
            }

            const targetUser = await User.findById(id);
            if (!targetUser) {
                return res.status(404).json({
                    message: USER.ERR.USER_NOT_FOUND
                });
            }

            const isTargetProtected = await User.isUserProtected(id);
            if (isTargetProtected) {
                return res.status(401).json({
                    message: USER.ERR.CANT_DELETE_SUPER_ADMIN
                });
            }

            const currentUserId = req.userId as string;
            const isCurrentOwner = await Role.hasOwnerRole(currentUserId);
            const isTargetOwner = await Role.hasOwnerRole(id);

            if (isCurrentOwner) {
                return next();
            }

            const hasPermission = await Permission.hasEditUserPermission(currentUserId);
            if (!hasPermission) {
                return res.status(401).json({
                    message: USER.ERR.USER_HAS_NO_MANAGE_USER_PERMISSIONS
                });
            }

            if (isTargetOwner) {
                return res.status(401).json({
                    message: USER.ERR.CANT_DELETE_OWNER
                });
            }

            return next();
        } catch (error) {
            const erro = error as Error;
            console.error(erro);
            return res.status(500).json({
                message: SERVER.ERR.INTERNAL_ERROR
            })
        }
    }
}