import { v4 as uuidv4 } from "uuid";

type TRecipeItem = {
    id: ReturnType <typeof uuidv4>;
    recipe_id: ReturnType <typeof uuidv4>;
    product_id: ReturnType <typeof uuidv4>;
    quantity: number;
    unit: string;
}

export default TRecipeItem;