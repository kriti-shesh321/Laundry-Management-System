import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import { getDashboardSummaryController } from "../controllers/dashboard.controller";

const router = Router();

router.use(authMiddleware);

router.get(
  "/summary",
  getDashboardSummaryController
);

export default router;