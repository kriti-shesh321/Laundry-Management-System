import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import { getGarmentTypesController } from "../controllers/garment.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", getGarmentTypesController);

export default router;