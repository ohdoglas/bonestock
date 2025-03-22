import { v4 as uuidv4 } from "uuid";
import { Status } from "../utils/enums/status";
import { Roles } from "../utils/enums/roles";
type TUser = {
    id: ReturnType <typeof uuidv4>;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    last_login?: Date;
    status: Status;
    role: Roles;
    confirmationToken?: string;
    emailVerified: boolean;
}

export default TUser;
