import { Request, Response } from "express";
import { OrderStatus } from "@prisma/client";

import {
    createOrderSchema,
    updateStatusSchema,
} from "../services/order.validation";

import {
    createOrder,
    getOrderById,
    getOrders,
    updateOrderStatus,
} from "../services/order.service";

export const createOrderController = async (
    req: Request,
    res: Response
) => {
    try {
        const validatedData =
            createOrderSchema.parse(req.body);

        const order = await createOrder({
            userId: req.user!.id,
            orderItems: validatedData.orderItems,
        });

        return res.status(201).json({
            success: true,
            data: order,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getOrdersController = async (
    req: Request,
    res: Response
) => {
    try {
        const orders = await getOrders(
            req.user!.id,
            req.user!.role
        );

        return res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getOrderByIdController = async (
    req: Request,
    res: Response
) => {
    try {
        const order = await getOrderById(
            req.params.id as string,
            req.user!.id,
            req.user!.role
        );

        return res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error: any) {
        const statusCode =
            error.message === "Forbidden"
                ? 403
                : error.message === "Order not found"
                    ? 404
                    : 400;

        return res.status(statusCode).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateOrderStatusController =
    async (
        req: Request,
        res: Response
    ) => {
        try {
            const validatedData =
                updateStatusSchema.parse(req.body);

            const updatedOrder =
                await updateOrderStatus(
                    req.params.id as string,
                    validatedData.status as OrderStatus
                );

            return res.status(200).json({
                success: true,
                data: updatedOrder,
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    };