import { v4 as uuidv4 } from "uuid";

type TInitialSetup = {
    id: ReturnType <typeof uuidv4>;
    setupComplete: boolean;
    setupToken: string;
    created_at: Date;
    completed_at: Date;
}

export default TInitialSetup;