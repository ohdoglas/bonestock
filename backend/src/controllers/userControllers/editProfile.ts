import { Response } from "express";
import UserProfile from "../../models/userProfile";
import SERVER from "../../utils/messages/serverMessages";
import USER from "../../utils/messages/userMessages";
import TRequestUserID from "../../types/TRequest";
import { formatDateOfBirth } from "../../utils/validation/validateDate";

export default class EditProfile {
    async controller(req: TRequestUserID, res: Response) {
    const { user_id, occupation, first_name, last_name, date_of_birth, phone_number } = req.body;

    try {
        const userId = user_id || req.userId as string;
        const userProfile = await UserProfile.getProfileByUserID(userId);

        if (!userProfile) {
            return res.status(404).json({ message: USER.ERR.PROFILE_NOT_FOUND });
        }

        const parsedDate = date_of_birth ? formatDateOfBirth(date_of_birth) : null;
        if (date_of_birth && !parsedDate) {
            return res.status(400).json({ message: USER.ERR.INVALID_DATE_FORMAT });
        }

        await UserProfile.update(userProfile.id, {
            first_name: first_name ?? userProfile.first_name,
            last_name: last_name ?? userProfile.last_name,
            date_of_birth: parsedDate as Date ?? userProfile.date_of_birth,
            phone_number: phone_number ?? userProfile.phone_number,
            occupation: occupation ?? userProfile.occupation,
            updated_at: new Date()
        });

        return res.status(200).json({
            message: USER.SUCCESS.PROFILE_CHANGES_MADE
        });

    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({
            message: SERVER.ERR.INTERNAL_ERROR
        });
    }
}
}
