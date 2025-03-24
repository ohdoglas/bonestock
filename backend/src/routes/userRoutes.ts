import { Router } from "express";
import confirmEmailMiddleware from "../middlewares/userMiddlewares/authenticateEmailConfirmation";
import emailConfirmationController from "../controllers/userControllers/emailConfirmation";
import userRegistrationMiddleware from "../middlewares/userMiddlewares/authenticateUserRegistration";
import userRegistration from "../controllers/userControllers/register";


export const userRoute = Router();

const authenticateEmailConfirmation = new confirmEmailMiddleware().authenticate;
const confirmEmail = new emailConfirmationController().confirm;

const authenticateUserRegistration = new userRegistrationMiddleware().authenticate;
const register = new userRegistration().controller;

userRoute.get('/confirm/:token', authenticateEmailConfirmation, confirmEmail);
userRoute.post('/registration', authenticateUserRegistration, register);