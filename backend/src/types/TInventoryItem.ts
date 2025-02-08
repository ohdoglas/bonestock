import { v4 as uuidv4 } from "uuid";

type TInventoryItem = {
    id: ReturnType <typeof uuidv4>;
    inventory_id: ReturnType <typeof uuidv4>;
    product_id: ReturnType <typeof uuidv4>;
    recorded_stock: number;
    real_stock: number;
    discrepancy: number;
}

export default TInventoryItem;