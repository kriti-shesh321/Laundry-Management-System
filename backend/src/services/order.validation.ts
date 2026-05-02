import { z } from "zod";
import { OrderStatus } from "@prisma/client";

export const createOrderSchema = z.object({
    orderItems: z
        .array(
            z.object({
                garmentTypeId: z.uuid(),
                quantity: z.number().min(1),
            })
        )
        .min(1),
});

export const updateStatusSchema = z.object({
    status: z.enum([
        OrderStatus.RECEIVED,
        OrderStatus.PROCESSING,
        OrderStatus.READY,
        OrderStatus.DELIVERED,
    ]),
});