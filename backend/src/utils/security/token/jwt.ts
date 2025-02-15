import "dotenv/config";
import jwt from "jsonwebtoken";
import SERVER from "../../messages/serverMessages";
import USER from "../../messages/userMessages";

const JWT_SECRET = process.env.JWT_SECRET || "";

export default async function generateToken(email: string) {
    try {
        const userId = await User.findByEmail(email);

        if(!userId) {
            return { status: 404, error: USER.ERR.USER_NOT_FOUND }
        };

        const payLoad = {
            sub: userId.id,
            iat: Math.floor(Date.now() / 1000),
        };

        const jwtToken = jwt.sign(payLoad, JWT_SECRET, { expiresIn: "1h" });

        return { status: 200, data: { token: jwtToken} };
    } catch (error) {
        console.error('Authentication failure ', error);
        return { status: 500, error: SERVER.ERR.INTERNAL_ERROR }
    }
}