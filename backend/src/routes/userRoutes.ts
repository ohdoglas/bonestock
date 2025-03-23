import { Router } from "express";
import confirmEmailMiddleware from "../middlewares/userMiddlewares/authenticateEmailConfirmation";
import emailConfirmationController from "../controllers/userControllers/emailConfirmation";


export const userRoute = Router();

const authenticateEmailConfirmation = new confirmEmailMiddleware().authenticate;
const confirmEmail = new emailConfirmationController().confirm;

userRoute.get('/confirm/:token', authenticateEmailConfirmation, confirmEmail);