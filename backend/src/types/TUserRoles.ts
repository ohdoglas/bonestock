import { v4 as uuidv4 } from "uuid";

type TUserRoles = {
    id: ReturnType <typeof uuidv4>;
    user_id: ReturnType <typeof uuidv4>;
    role_id: ReturnType <typeof uuidv4>;
    assigned_at: Date;
    revoked_at?: Date;
}

export default TUserRoles;