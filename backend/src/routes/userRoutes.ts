import { Request, Response, Router } from "express";
import confirmEmailMiddleware from "../middlewares/userMiddlewares/authenticateEmailConfirmation";
import emailConfirmationController from "../controllers/userControllers/emailConfirmation";
import userRegistrationMiddleware from "../middlewares/userMiddlewares/authenticateUserRegistration";
import userRegistration from "../controllers/userControllers/register";
import LoginMiddleware from "../middlewares/userMiddlewares/authenticateUserLogin";
import Login from "../controllers/userControllers/login";
import ResetPasswordRequestMiddleware from "../middlewares/userMiddlewares/authenticatePasswordResetRequest";
import ResetPasswordRequest from "../controllers/userControllers/resetPasswordRequest";
import PasswordResetMiddleware from "../middlewares/userMiddlewares/authenticatePasswordReset";
import ResetPassword from "../controllers/userControllers/resetPassword";
import { authenticateToken } from "../middlewares/authenticateToken";
import EditPasswordMiddleware from "../middlewares/userMiddlewares/authenticateEditPassword";
import EditPassword from "../controllers/userControllers/editPassword";

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

const resetPassword = {
    middleware: new PasswordResetMiddleware().authenticate,
    controller: new ResetPassword().controller
}

const editPassword = {
    middleware: new EditPasswordMiddleware().authenticate,
    controller: new EditPassword().controller
}

userRoute.get('/confirm/:token', emailConfirmation.middleware, emailConfirmation.controller);
userRoute.post('/registration', register.middleware, register.controller);
userRoute.post('/login', login.middleware, login.controller);
userRoute.post('/request-password-reset', resetPasswordRequest.middleware, resetPasswordRequest.controller);
userRoute.post('/password-reset', resetPassword.middleware, resetPassword.controller);
userRoute.use(authenticateToken);
userRoute.patch('/edit-password', editPassword.middleware, editPassword.controller);

userRoute.get('/tokentest', (req: Request, res: Response) => {
    return res.status(200).json({
        message: "Token Test OK"
    });
});