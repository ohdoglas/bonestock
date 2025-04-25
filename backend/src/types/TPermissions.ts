import { v4 as uuidv4 } from "uuid";

type TPermissions = {
    id: ReturnType <typeof uuidv4>;
    permissions: string;
    description?: string;
    status: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

export default TPermissions;