import { v4 as uuidv4 } from "uuid";
import TUserProfile from "../types/TUserProfile";
import prisma from "../config/prisma";

export default class UserProfile {
    id: ReturnType<typeof uuidv4>;
    user_id: ReturnType<typeof uuidv4>;
    first_name?: string;
    last_name?: string;
    date_of_birth?: Date;
    phone_number?: string;
    accupation: string;
    created_at: Date;
    updated_at: Date;

    constructor(props: TUserProfile) {
        this.id = props.id || uuidv4();
        this.user_id = props.user_id;
        this.first_name = props.first_name;
        this.last_name = props.last_name;
        this.date_of_birth = props.date_of_birth;
        this.phone_number = props.phone_number;
        this.accupation = props.occupation;
        this.created_at = props.created_at;
        this.updated_at = props.updated_at;
    }

    static async create(userId: string, profileData: Partial<TUserProfile>) {
        try {
            const newProfile = await prisma.userProfile.create({
                data: {
                    id: uuidv4(),
                    user_id: userId,
                    first_name: profileData.first_name ?? null,
                    last_name: profileData.last_name ?? null,
                    date_of_birth: profileData.date_of_birth ?? null,
                    phone_number: profileData.phone_number ?? null,
                    occupation: profileData.occupation ?? null,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            });
            return newProfile;
        } catch (error) {
            console.error("Error creating user profile:", error);
            throw new Error("Failed to create user profile");
        }
    }

    static async getProfileByUserID(userId: string) {
        const profile = await prisma.userProfile.findUnique({
            where: {
                user_id: userId
            }
        });

        if (!profile) {
            return false;
        }

        return profile;
    }

    static async update(id: string, profile: Partial<TUserProfile>) {
        try {
            const profileUp = await prisma.userProfile.update({
                where: {
                    id: id
                }, data: {
                    first_name: profile.first_name ?? null,
                    last_name: profile.last_name ?? null,
                    date_of_birth: profile.date_of_birth ?? null,
                    phone_number: profile.phone_number ?? null,
                    occupation: profile.occupation ?? null,
                    updated_at: new Date()
                }
            });
            return profileUp;
        } catch (error) {
            console.error("Error updating user profile:", error);
            throw new Error("Failed updating user profile");
        }
    }

}