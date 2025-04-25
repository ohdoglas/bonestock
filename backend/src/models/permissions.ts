import prisma from "../config/prisma";
import { Permissions } from "../utils/enums/permissions";
import { v4 as uuidv4 } from "uuid";
import { RolePermissions } from "../utils/enums/rolePermissions";

const permissions = [
    {
        permission: Permissions.READ_ONLY, description: 'Read-Only Access'
    },
    {
        permission: Permissions.MANAGE_STOCK, description: 'Manage Stock'
    },
    {
        permission: Permissions.MANAGE_PURCHASES, description: 'Manage Purchases'
    },
    {
        permission: Permissions.MANAGE_USERS, description: 'Manage User Accounts'
    },
    {
        permission: Permissions.VIEW_DASHBOARD, description: 'View Dashboard'
    },
    {
        permission: Permissions.MANAGE_RECIPES, description: 'Manage Recipes'
    },
    {
        permission: Permissions.MANAGE_SALES, description: 'Manage Sales'
    },
    {
        permission: Permissions.AUDIT_LOGS, description: 'Audit Logs'
    }
]

export default class Permission {
    static async seed() {
        const createdPermissions = [];

        for (const permission of permissions) {
            const permissionsExists = await prisma.permissions.findUnique({
                where: { permission: permission.permission }
            });

            if (!permissionsExists) {
                await prisma.permissions.create({
                    data: permission
                });
                createdPermissions.push(permission.permission);
            }
        }
        return createdPermissions;
    }

    static async assignPermissions(permissionName: string, userId: string) {
        const permissionId = await prisma.permissions.findUnique({
            where: { permission: permissionName },
            select: { id: true }
        });

        if (!permissionId) {
            return false;
        }

        const assign = await prisma.userPermissions.create({
            data: {
                id: uuidv4(),
                user_id: userId,
                permission_id: permissionId.id,
                granted_at: new Date()
            }
        });

        return assign;
    }

    static async hasEditUserPermission(user_id: string) {
        const permissionID = await prisma.permissions.findFirst({
            where: { permission: Permissions.MANAGE_USERS },
            select: { id: true }
        });

        if (!permissionID) {
            return false;
        }

        const hasPermission = await prisma.userPermissions.findFirst({
            where: {
                permission_id: permissionID.id,
                AND:
                { user_id: user_id }
            },
        });
        if (!hasPermission) {
            return false;
        }

        return hasPermission
    }

    static async assignRolePermissions(role: string, userId: string) {
        const roleKey = role as keyof typeof RolePermissions;
        const permissions = RolePermissions[roleKey];

        if (!permissions) {
            throw new Error(`Role '${role}' não encontrada.`);
        }

        for (const permission of permissions) {
            try {
                await Permission.assignPermissions(permission, userId);
            } catch (error) {
                console.error(`Erro ao atribuir permissão ${permission}`, error);
            }
        }

        return true;
    }
}