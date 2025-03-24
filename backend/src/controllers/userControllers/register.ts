import { Request, Response } from "express";
import SERVER from "../../utils/messages/serverMessages";
import User from "../../models/user";
import { Status } from "../../utils/enums/status";
import { Roles } from "../../utils/enums/roles";
import Permission from "../../models/permissions";
import { Permissions } from "../../utils/enums/permissions";
import Role from "../../models/roles";



export default class userRegistration {
    async controller (req: Request, res: Response) {
        const { username, email, password} = req.body;

        try {
            const newUser = await User.create({
                username,
                email,
                password
            },
            Status.ACTIVE,
            Roles.VIEWER
        );
        Role.assignUserRoles(Roles.VIEWER, newUser.id);
        Permission.assignPermissions(Permissions.READ_ONLY, newUser.id);
        Permission.assignPermissions(Permissions.VIEW_DASHBOARD, newUser.id);

        } catch (error) {
            const erro = error as Error;
            console.error(erro);
            return res.status(500).json({
                message: SERVER.ERR.INTERNAL_ERROR
            });
        }
    }
}