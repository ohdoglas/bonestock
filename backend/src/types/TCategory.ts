import { v4 as uuidv4 } from "uuid";

type TCategory = {
    id: ReturnType <typeof uuidv4>;
    name: string;
}

export default TCategory;