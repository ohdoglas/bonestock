import { v4 as uuidv4 } from "uuid";

type TInvalidToken = {
    id: ReturnType <typeof uuidv4>;
    user_id: ReturnType <typeof uuidv4>;
    token: string;
    created_at: Date;
}

export default TInvalidToken;