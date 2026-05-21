import { Router, type IRouter } from "express";
import healthRouter from "./health";
import menuRouter from "./menu.js";
import adminRouter from "./admin.js";
import specialsRouter from "./specials.js";
import storageRouter from "./storage.js";
import contactRouter from "./contact.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(menuRouter);
router.use(adminRouter);
router.use(specialsRouter);
router.use(storageRouter);
router.use(contactRouter);

export default router;
