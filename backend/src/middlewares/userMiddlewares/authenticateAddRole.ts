import { NextFunction, Response } from "express";
import { validate as isValid } from "uuid";
import TRequestUserID from "../../types/TRequest";
import SERVER from "../../utils/messages/serverMessages";
import USER from "../../utils/messages/userMessages";
import Permission from "../../models/permissions";
import Role from "../../models/roles";
import User from "../../models/user";
import { Roles } from "../../utils/enums/roles";


export default class AddRoleMiddleware {
    async authenticate(req: TRequestUserID, res: Response, next: NextFunction) {
        const { id, role } = req.body;

        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(400).json({
                    message: USER.ERR.USER_ID_NOT_FOUND
                });
            }

            if (!id || !role) {
                return res.status(400).json({
                    message: USER.ERR.ADD_ROLE_MISSING_FIELDS
                });
            }

            if (typeof role !== "string") {
                return res.status(400).json({
                    message: USER.ERR.ADD_ROLE_INVALID_ROLE_FORMAT
                });
            }

            if (!isValid(id)) {
                return res.status(401).json({
                    message: USER.ERR.INVALID_UUID_FORMAT
                });
            }

            const roleExists = await Role.roleExists(role.toUpperCase());
            if (!roleExists) {
                return res.status(404).json({
                    message: USER.ERR.ROLE_NOT_FOUND
                });
            }

            const hasPermission = await Permission.hasEditUserPermission(userId);
            if (!hasPermission) {
                return res.status(401).json({
                    message: USER.ERR.USER_HAS_NO_MANAGE_USER_PERMISSIONS
                });
            }

            const userExists = await User.findById(id);
            if (!userExists) {
                return res.status(404).json({
                    message: USER.ERR.USER_NOT_FOUND
                });
            }

            const isActiveUser = await User.isActive(id);
            if (!isActiveUser) {
                return res.status(400).json({
                    message: USER.ERR.ADD_ROLE_USER_ACCOUNT_NOT_ACTIVE
                });
            }

            if (role.toUpperCase() === Roles.OWNER) {
                const isOwner = await Role.hasOwnerRole(req.userId as string, role.toUpperCase());

                if (!isOwner) {
                    return res.status(401).json({
                        message: USER.ERR.USER_IS_NOT_OWNER
                    });
                }
            }

            next();
        } catch (error) {
            console.error(error as Error);
            return res.status(500).json({
                message: SERVER.ERR.INTERNAL_ERROR
            });
        }
    }
}