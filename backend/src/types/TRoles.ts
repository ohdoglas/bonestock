import { v4 as uuidv4 } from "uuid";

type TRoles = {
    id: ReturnType <typeof uuidv4>;
    role_name: string;
    description?: string;
    status: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

export default TRoles;