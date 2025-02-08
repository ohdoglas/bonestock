import { v4 as uuidv4 } from "uuid";
type TUser = {
    id: ReturnType <typeof uuidv4>;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    last_login?: Date;
    status: string;
    role: string;
    confirmationToken?: string;
    emailVerified: boolean;
}

export default TUser;
