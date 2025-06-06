import { Router, Request, Response } from "express";
import initSetupRoute from "./serverSide/initSetupRoute";
import { userRoute } from "./userRoutes";
import { authenticateToken } from "../middlewares/authenticateToken";

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        message: "Server OK"
    });
});

routes.use('/', initSetupRoute)
routes.use('/', userRoute);

export default routes;