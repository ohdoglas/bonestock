import { NextFunction, Response } from "express";
import { validate as isValidUUID } from "uuid";
import TRequestUserID from "../../types/TRequest";
import SERVER from "../../utils/messages/serverMessages";
import User from "../../models/user";
import USER from "../../utils/messages/userMessages";
import UserProfile from "../../models/userProfile";
import Permission from "../../models/permissions";


export default class EditProfileMiddleware {
    async authenticate(req: TRequestUserID, res: Response, next: NextFunction) {
        const { user_id, occupation, first_name, last_name, date_of_birth, phone_number } = req.body;
        try {

            if (!user_id || !occupation) {
                return res.status(400).json({
                    message: USER.ERR.PROFILE_MISSING_MANDATORY_FIELDS
                })
            }

            const userId = user_id

            if (user_id && typeof user_id !== "string") {
                return res.status(400).json({
                    message: USER.ERR.PROFILE_INVALID_INPUT_TYPE
                });
            }

            if (!isValidUUID(userId)) {
                return res.status(400).json({
                    message: USER.ERR.INVALID_UUID_FORMAT
                });
            }

            if (occupation && typeof occupation !== "string") {
                return res.status(400).json({
                    message: USER.ERR.PROFILE_INVALID_INPUT_TYPE
                });
            }

            if (first_name && typeof first_name !== "string") return res.status(400).json({ message: USER.ERR.PROFILE_INVALID_INPUT_TYPE });
            if (last_name && typeof last_name !== "string") return res.status(400).json({ message: USER.ERR.PROFILE_INVALID_INPUT_TYPE });
            if (phone_number && typeof phone_number !== "string") return res.status(400).json({ message: USER.ERR.PROFILE_INVALID_INPUT_TYPE });

            if (userId !== req.userId) {
                const hasEditUserPermission = await Permission.hasEditUserPermission(req.userId as string);
                if (!hasEditUserPermission) {
                    return res.status(401).json({
                        message: USER.ERR.USER_HAS_NO_MANAGE_USER_PERMISSIONS
                    });
                }
            }

            const userExists = await User.findById(userId);
            if (!userExists) {
                return res.status(404).json({
                    message: USER.ERR.USER_NOT_FOUND
                });
            }

            const profileAlreadyCreated = await UserProfile.getProfileByUserID(userId);
            if (profileAlreadyCreated) {
                return next();
            }

            if (!occupation) {
                return res.status(400).json({
                    message: USER.ERR.PROFILE_USER_OCCUPATION_NOT_PROVIDED
                });
            }

            const isEmailVerified = await User.isVerified(userExists.id);
            if (!isEmailVerified) {
                return res.status(400).json({
                    message: USER.ERR.EMAIL_CONFIRMATION_REQUIRED
                });
            }

            const isActive = await User.isActive(userExists.id);
            if (!isActive) {
                return res.status(400).json({
                    message: USER.ERR.ACCOUNT_NOT_ACTIVE
                });
            }

            next();
        } catch (error) {
            const erro = error as Error;
            console.error(erro);
            return res.status(500).json({
                message: SERVER.ERR.INTERNAL_ERROR
            });
        }
    }
}