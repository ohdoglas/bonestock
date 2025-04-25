import { v4 as uuidv4 } from "uuid";

type TResetPasswordToken = {
    id: ReturnType <typeof uuidv4>;
    user_id: ReturnType <typeof uuidv4>;
    token: string;
    expires_at?: Date;
    used: boolean;
}

export default TResetPasswordToken;