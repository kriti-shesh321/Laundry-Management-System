import { Router } from "express";

import authRoutes from "./auth.routes";
import dashboardRoutes from "./dashboard.routes";
import garmentRoutes from "./garment.routes";
import orderRoutes from "./order.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/garment-types", garmentRoutes);
router.use("/orders", orderRoutes);

export default router;