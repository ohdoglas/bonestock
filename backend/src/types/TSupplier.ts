import { v4 as uuidv4 } from "uuid";

type TSupplier = {
    id: ReturnType <typeof uuidv4>;
    name: string;
    contact?: string;
    email?: string;
    phone?: string;
    address?: string;
    created_at: Date;
    updated_at: Date;
}

export default TSupplier;