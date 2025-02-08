import { v4 as uuidv4 } from "uuid";

type TProduct = {
    id: ReturnType <typeof uuidv4>;
    name: string;
    description?: string;
    category_id: ReturnType <typeof uuidv4>;
    barcode?: string;
    supplier_id?: ReturnType <typeof uuidv4>;
    stock: number;
    unit_id: ReturnType <typeof uuidv4>;
    price: number;
    expiration_date?: Date;
    created_at: Date;
    updated_at: Date;
}

export default TProduct;