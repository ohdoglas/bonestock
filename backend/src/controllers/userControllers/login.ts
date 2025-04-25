import { Request, Response } from "express";
import SERVER from "../../utils/messages/serverMessages";
import User from "../../models/user";
import generateToken from "../../utils/security/token/jwt";


export default class Login {
    async controller(req: Request, res: Response) {
        const { username, email } = req.body;

        try {
            if (!email) {
                const user = await User.findByUsername(username);
                const tokenResponse = await generateToken(user!.email);

                if (tokenResponse.status !== 200) {
                    return res.status(tokenResponse.status).json({
                        message: tokenResponse.error
                    });
                }

                await User.updateLastLogin(user!.email);

                return res.status(tokenResponse.status).json({
                    token: tokenResponse.data?.token
                });
            }

            const tokenRes = await generateToken(email);

            if(tokenRes.status !== 200) {
                return res.status(tokenRes.status).json({
                    message: tokenRes.error
                });
            }

            await User.updateLastLogin(email);

            return res.status(tokenRes.status).json({
                token: tokenRes.data?.token
            });
        } catch (error) {
            const erro = error as Error;
            console.error(erro);
            return res.status(500).json({
                message: SERVER.ERR.INTERNAL_ERROR
            });
        }
    }
}