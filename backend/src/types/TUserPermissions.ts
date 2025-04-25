import { v4 as uuidv4 } from "uuid";

type TUserPermissions = {
    id: ReturnType <typeof uuidv4>;
    user_id: ReturnType <typeof uuidv4>;
    permission_id: ReturnType <typeof uuidv4>;
    granted_at: Date;
    revoked_at?: Date;
}

export default TUserPermissions;