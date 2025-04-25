import { NextFunction, Request, Response } from "express";
import InitialSetup from "../models/initialSetup";
import Role from "../models/roles";
import { Roles } from "../utils/enums/roles";
import Permission from "../models/permissions";
import { Permissions } from "../utils/enums/permissions";
import SETUP from "../utils/messages/setupMsg";
import SERVER from "../utils/messages/serverMessages";



export default class initSetup {
    async controller(req: Request, res: Response, next: NextFunction) {
        const { username, email, password, token } = req.body;

        try {
            const superAdmin = await InitialSetup.createAdmin(username, email, password);

            await InitialSetup.markSetupComplete(token);
            await InitialSetup.enableUserProtection(email);

            await Role.assignUserRoles(Roles.OWNER, superAdmin.id);
            await Permission.assignPermissions(Permissions.VIEW_DASHBOARD, superAdmin.id);
            await Permission.assignPermissions(Permissions.MANAGE_USERS, superAdmin.id);
            await Permission.assignPermissions(Permissions.MANAGE_STOCK, superAdmin.id);
            await Permission.assignPermissions(Permissions.MANAGE_SALES, superAdmin.id);
            await Permission.assignPermissions(Permissions.MANAGE_RECIPES, superAdmin.id);
            await Permission.assignPermissions(Permissions.MANAGE_PURCHASES, superAdmin.id);
            await Permission.assignPermissions(Permissions.AUDIT_LOGS, superAdmin.id);

            return res.status(203).json({
                message: SETUP.SUCCESS.ADMIN_CREATED,
                user: {
                    username,
                    email
                }
            });
        } catch (error) {
            const erro = error as Error;
            console.log(erro);
            return res.status(500).json({
                message: SERVER.ERR.INTERNAL_ERROR
            });
        }
    }
}