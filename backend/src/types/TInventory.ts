import { v4 as uuidv4 } from "uuid";

type TInventory = {
    id: ReturnType <typeof uuidv4>;
    user_id: ReturnType <typeof uuidv4>;
    date: Date;
    status: string;
    created_at: Date;
    updated_at: Date;
}

export default TInventory;