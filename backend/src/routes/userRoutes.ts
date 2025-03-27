import { Router } from "express";
import confirmEmailMiddleware from "../middlewares/userMiddlewares/authenticateEmailConfirmation";
import emailConfirmationController from "../controllers/userControllers/emailConfirmation";
import userRegistrationMiddleware from "../middlewares/userMiddlewares/authenticateUserRegistration";
import userRegistration from "../controllers/userControllers/register";
import LoginMiddleware from "../middlewares/userMiddlewares/authenticateUserLogin";
import Login from "../controllers/userControllers/login";
import ResetPasswordRequestMiddleware from "../middlewares/userMiddlewares/authenticatePasswordResetRequest";
import ResetPasswordRequest from "../controllers/userControllers/resetPasswordRequest";


export const userRoute = Router();

const emailConfirmation = {
    middleware: new confirmEmailMiddleware().authenticate,
    controller: new emailConfirmationController().confirm
};
const register = {
    middleware: new userRegistrationMiddleware().authenticate,
    controller: new userRegistration().controller
};
const login = {
    middleware: new LoginMiddleware().authenticate,
    controller: new Login().controller
};
const resetPasswordRequest = {
    middleware: new ResetPasswordRequestMiddleware().authenticate,
    controller: new ResetPasswordRequest().controller
};

userRoute.get('/confirm/:token', emailConfirmation.middleware, emailConfirmation.controller);
userRoute.post('/registration', register.middleware, register.controller);
userRoute.post('/login', login.middleware, login.controller);
userRoute.post('/request-reset-password', resetPasswordRequest.middleware, resetPasswordRequest.controller);