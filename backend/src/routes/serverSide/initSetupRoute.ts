import { Router } from "express";
import initSetupMiddleware from "../../middlewares/initSetupMiddleware";
import initSetup from "../../controllers/initSetup";

const initSetupRoute = Router();

const initialSetup = {
    middleware: new initSetupMiddleware().authenticate,
    controller: new initSetup().controller
}

initSetupRoute.post('/setup/owner', initialSetup.middleware, initialSetup.controller);

export default initSetupRoute;