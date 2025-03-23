import { Router } from "express";
import initSetupMiddleware from "../../middlewares/initSetupMiddleware";
import initSetup from "../../controllers/initSetup";

const initSetupRoute = Router();

const ownerAuthentication = new initSetupMiddleware().authenticate;
const setupOwner = new initSetup().controller;

initSetupRoute.post('/setup/owner', ownerAuthentication, setupOwner);

export default initSetupRoute;