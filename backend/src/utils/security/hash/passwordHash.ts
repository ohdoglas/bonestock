import * as bcrypt from "bcrypt";

const saltRounds = 10;

export default async function hash(password:string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(saltRounds);

        const hashed = await bcrypt.hash(password, salt);

        return hashed;
    } catch (error) {
        console.error("Error encrypting password: ", error);
        throw new Error("Error encrypting password: ");
    }
}