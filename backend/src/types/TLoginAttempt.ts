import { v4 as uuidv4 } from "uuid";

type TLoginAttempt = {
    id: ReturnType <typeof uuidv4>;
    user_id: string;
    ip_address?: string;
    attempt_time: Date;
    success: boolean;
    failed_attempts: number;
    lock_until: Date;
}

export default TLoginAttempt;