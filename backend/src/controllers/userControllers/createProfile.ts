import { NextFunction, Response } from "express";
import TRequestUserID from "../../types/TRequest";
import SERVER from "../../utils/messages/serverMessages";
import UserProfile from "../../models/userProfile";
import USER from "../../utils/messages/userMessages";
import { formatDateOfBirth } from "../../utils/validation/validateDate";

export default class CreateProfile {
    async controller(req: TRequestUserID, res: Response, next: NextFunction) {
        const { user_id, occupation, first_name, last_name, date_of_birth, phone_number } = req.body;

        try {
            const userId = user_id || req.userId as string;
            const userProfile = await UserProfile.getProfileByUserID(userId);

            if (userProfile) {
                return next();
            }

            const parsedDate = date_of_birth ? formatDateOfBirth(date_of_birth) : null;
            if (date_of_birth && !parsedDate) {
                return res.status(400).json({ message: USER.ERR.INVALID_DATE_FORMAT });
            }

            await UserProfile.create(userId, {
                user_id: userId,
                first_name: first_name ?? null,
                last_name: last_name ?? null,
                date_of_birth: parsedDate as Date ?? null,
                phone_number: phone_number ?? null,
                occupation: occupation ?? null
            });

            return res.status(200).json({
                message: USER.SUCCESS.PROFILE_CHANGES_MADE
            });

        } catch (error) {
            console.error(error);

            if (!res.headersSent) {
                return res.status(500).json({
                    message: SERVER.ERR.INTERNAL_ERROR
                });
            }
        }
    }
}
