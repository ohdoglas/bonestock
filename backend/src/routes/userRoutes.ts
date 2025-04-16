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
import AuthController from "../controllers/userControllers/logout";
import EditProfileMiddleware from "../middlewares/userMiddlewares/authenticateEditProfile";
import CreateProfile from "../controllers/userControllers/createProfile";
import EditProfile from "../controllers/userControllers/editProfile";
import AddRoleMiddleware from "../middlewares/userMiddlewares/authenticateAddRole";
import AddRole from "../controllers/userControllers/addRole";
import DeleteUserMiddleware from "../middlewares/userMiddlewares/authenticateDeleteUser";
import DeleteUser from "../controllers/userControllers/deleteAccount";
import DeleteOwnUser from "../controllers/userControllers/deleteOwnAccount";

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
};
const editPassword = {
    middleware: new EditPasswordMiddleware().authenticate,
    controller: new EditPassword().controller
};
const logout = {
    controller: new AuthController().logout
};
const createOrEditProfile = {
    middleware: new EditProfileMiddleware().authenticate,
    createProfileController: new CreateProfile().controller,
    editProfileController: new EditProfile().controller

};
const addRole = {
    middleware: new AddRoleMiddleware().authenticate,
    controller: new AddRole().controller
};

const deleteUser = {
    middleware: new DeleteUserMiddleware().authenticate,
    deleteOtherUserController: new DeleteUser().controller,
    deleteOwnUserController: new DeleteOwnUser().controller
};

userRoute.get('/users/confirm/:token', emailConfirmation.middleware, emailConfirmation.controller);
userRoute.post('/users/registration', register.middleware, register.controller);
userRoute.post('/users/login', login.middleware, login.controller);
userRoute.post('/users/request-password-reset', resetPasswordRequest.middleware, resetPasswordRequest.controller);
userRoute.post('/users/password-reset', resetPassword.middleware, resetPassword.controller);
userRoute.use(authenticateToken);
userRoute.patch('/users/edit-password', editPassword.middleware, editPassword.controller);
userRoute.post('/users/logout', logout.controller);
userRoute.post('/users/edit-profile', createOrEditProfile.middleware, createOrEditProfile.createProfileController, createOrEditProfile.editProfileController);
userRoute.post('/users/add-role-permission', addRole.middleware, addRole.controller);
userRoute.delete('/users/delete-user/:id', deleteUser.middleware, deleteUser.deleteOtherUserController, deleteUser.deleteOwnUserController);

userRoute.get('/tokentest', (req: Request, res: Response) => {
    return res.status(200).json({
        message: "Token Test OK"
    });
});