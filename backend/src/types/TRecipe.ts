import { v4 as uuidv4 } from "uuid";

type TRecipe = {
    id: ReturnType <typeof uuidv4>;
    name: string;
    category: string;
    description?: string;
    created_at: Date;
    updated_at: Date;
}

export default TRecipe;