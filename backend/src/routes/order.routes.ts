import { Router } from "express";
import { Role } from "@prisma/client";

import {
    createOrderController,
    getOrderByIdController,
    getOrdersController,
    updateOrderStatusController,
} from "../controllers/order.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", createOrderController);

router.get("/", getOrdersController);

router.get("/:id", getOrderByIdController);

router.patch(
    "/:id/status",
    roleMiddleware([Role.ADMIN]),
    updateOrderStatusController
);

export default router;