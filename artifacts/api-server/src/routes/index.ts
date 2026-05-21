import { Router, type IRouter } from "express";
import healthRouter from "./health";
import menuRouter from "./menu.js";
import adminRouter from "./admin.js";
import specialsRouter from "./specials.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(menuRouter);
router.use(adminRouter);
router.use(specialsRouter);

export default router;
