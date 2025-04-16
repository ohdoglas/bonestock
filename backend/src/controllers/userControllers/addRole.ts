import { Response } from "express";
import TRequestUserID from "../../types/TRequest";
import SERVER from "../../utils/messages/serverMessages";
import Role from "../../models/roles";
import Permission from "../../models/permissions";
import USER from "../../utils/messages/userMessages";
import User from "../../models/user";


export default class AddRole {
    async controller(req: TRequestUserID, res: Response) {
        const { id, role } = req.body;

        try {

            await Role.assignUserRoles(role.toUpperCase(), id);

            await Permission.assignRolePermissions(role.toUpperCase(), id);

            await User.changeRole(id, role.toUpperCase());

            return res.status(200).json({
                message: USER.SUCCESS.ROLE_ADDED_SUCCESSFULLY
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: SERVER.ERR.INTERNAL_ERROR
            });
        }
    }
}