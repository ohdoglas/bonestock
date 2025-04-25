import { v4 as uuidv4 } from "uuid";

type TStockMovement = {
    id: ReturnType <typeof uuidv4>;
    product_id: ReturnType <typeof uuidv4>;
    type_id: ReturnType <typeof uuidv4>;
    quantity: number;
    unit_price: number;
    total_price: number;
    source: string;
    created_at: Date;
}

export default TStockMovement;