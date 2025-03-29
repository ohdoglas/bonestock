import { v4 as uuidv4 } from "uuid";
import TInvalidToken from "../types/TInvalidToken";
import prisma from "../config/prisma";
import SERVER from "../utils/messages/serverMessages";


export default class InvalidToken {
    id: ReturnType<typeof uuidv4>;
    user_id: ReturnType<typeof uuidv4>;
    token: string;
    created_at: Date;

    constructor(props: TInvalidToken) {
        this.id = props.id || uuidv4();
        this.user_id = props.user_id;
        this.token = props.token;
        this.created_at = props.created_at
    }

    static async create(useId: string, token: string) {
        await prisma.invalidToken.create({
            data: {
                id: uuidv4(),
                user_id: useId,
                token: token,
                created_at: new Date()
            }
        })
    }
    static async deleteInvalidTokens(user_id: string) {
        try {
            await prisma.invalidToken.deleteMany({
                where: { user_id: user_id },
            });

            return { success: true, message: SERVER.SUCCESS.INVALID_TOKENS_DELETED }
        } catch (error) {
            console.error("Erro ao deletar tokens invalidados:", error);
            throw new Error(SERVER.ERR.DELETE_INVALID_TOKENS_FAILED)
        }
    }
}