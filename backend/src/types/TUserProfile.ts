import { v4 as uuidv4 } from "uuid";

type TUserProfile = {
    id: ReturnType <typeof uuidv4>;
    user_id: string;
    first_name?: string;
    last_name?: string;
    date_of_birth?: Date;
    phone_number?: string;
    occupation: string;
    created_at: Date;
    updated_at: Date;
}

export default TUserProfile;