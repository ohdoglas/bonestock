import { Permissions } from "./permissions";
import { Roles } from "./roles";

export const RolePermissions = {
    [Roles.OWNER]: [
        Permissions.MANAGE_USERS,
        Permissions.VIEW_DASHBOARD,
        Permissions.MANAGE_STOCK,
        Permissions.MANAGE_PURCHASES,
        Permissions.MANAGE_RECIPES,
        Permissions.MANAGE_SALES,
        Permissions.AUDIT_LOGS
    ],
    [Roles.MANAGER]: [
        Permissions.MANAGE_USERS,
        Permissions.VIEW_DASHBOARD,
        Permissions.MANAGE_STOCK,
        Permissions.MANAGE_PURCHASES,
        Permissions.MANAGE_RECIPES,
        Permissions.MANAGE_SALES
    ],
    [Roles.STOCK_CONTROLLER]: [
        Permissions.MANAGE_STOCK,
        Permissions.READ_ONLY
    ],
    [Roles.PURCHASING]: [
        Permissions.MANAGE_PURCHASES,
        Permissions.READ_ONLY
    ],
    [Roles.CHEF]: [
        Permissions.MANAGE_RECIPES,
        Permissions.READ_ONLY
    ],
    [Roles.BARTENDER]: [
        Permissions.MANAGE_RECIPES,
        Permissions.READ_ONLY
    ],
    [Roles.CASHIER]: [
        Permissions.MANAGE_SALES,
        Permissions.READ_ONLY
    ],
    [Roles.VIEWER]: [
        Permissions.READ_ONLY
    ]
};