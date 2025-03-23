import { Router, Request, Response } from "express";
import initSetupRoute from "./serverSide/initSetupRoute";

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        message: "Server OK"
    });
});

routes.use('/', initSetupRoute)

export default routes;