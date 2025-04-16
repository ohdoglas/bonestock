import { Status } from './../utils/enums/status';
import prisma from "../config/prisma";
import { Roles } from "../utils/enums/roles";
import { v4 as uuidv4 } from "uuid";

const roles = [
    {
        role_name: Roles.OWNER, description: 'Owner', status: true
    },
    {
    role_name: Roles.MANAGER, description: 'Manager', status: true
    },
    {
    role_name: Roles.STOCK_CONTROLLER, description: 'Stock Controller', status: true
    },
    {
    role_name: Roles.PURCHASING, description: 'Purchase', status: true
    },
    {
    role_name: Roles.CHEF, description: 'Restaurant Chef', status: true
    },
    {
    role_name: Roles.BARTENDER, description: 'Bartender', status: true
    },
    {
    role_name: Roles.CASHIER, description: 'Cashier', status: true
    },
    {
    role_name: Roles.VIEWER, description: 'Viewer', status: true
    }
];

export default class Role {
    static async seed() {
        const createdRoles = [];

        for (const role of roles) {
            const roleExists = await prisma.roles.findUnique({
                where: { role_name: role.role_name }
            });

            if (!roleExists) {
                await prisma.roles.create({
                    data: role
                });
                createdRoles.push(role.role_name);
            }
        }
        return createdRoles;
    }

    static async assignUserRoles(role: string, userId: string) {

        const roleId = await prisma.roles.findUnique({
            where: { role_name: role },
            select: { id: true }
        });

        if (!roleId) {
            return false;
        }

        const assignedRole = await prisma.userRoles.create({
            data: {
                id: uuidv4(),
                role_id: roleId!.id,
                user_id: userId,
                assigned_at: new Date(),
            }
        });

        return assignedRole;
    }

    static async roleExists(roleName: string) {
        const role = await prisma.roles.findFirst({
            where: { role_name: roleName }
        });

        if (!role) {
            return false;
        }

        return role;
    }

    static async hasOwnerRole(userId: string, role?: string) {

        const roleId = await prisma.roles.findFirst({
            where: { role_name: Roles.OWNER },
            select: { id: true }
        });

        if (!roleId) {
            return false;
        };

        const owner = await prisma.userRoles.findFirst({
            where: {
                role_id: roleId.id,
                AND:
                { user_id: userId }
            },
        });

        if (!owner) {
            return false;
        };

        return owner;
    }
}