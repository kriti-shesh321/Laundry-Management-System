import { OrderStatus } from "@prisma/client";

import { prisma } from "../lib/prisma";

type CreateOrderInput = {
    userId: string;
    orderItems: {
        garmentTypeId: string;
        quantity: number;
    }[];
};

const calculateEstimatedDeliveryDate = (
    totalQuantity: number
) => {
    const date = new Date();

    if (totalQuantity <= 5) {
        date.setDate(date.getDate() + 2);
    } else if (totalQuantity <= 10) {
        date.setDate(date.getDate() + 3);
    } else {
        date.setDate(date.getDate() + 5);
    }

    return date;
};

export const createOrder = async (
    data: CreateOrderInput
) => {
    const garmentIds = data.orderItems.map(
        (item) => item.garmentTypeId
    );

    const garments = await prisma.garmentType.findMany({
        where: {
            id: {
                in: garmentIds,
            },
        },
    });

    const garmentMap = new Map(
        garments.map((garment) => [
            garment.id,
            garment,
        ])
    );

    let totalAmount = 0;
    let totalQuantity = 0;

    const processedItems = data.orderItems.map((item) => {
        const garment = garmentMap.get(item.garmentTypeId);

        if (!garment) {
            throw new Error("Invalid garment type");
        }

        const subTotal =
            garment.basePrice * item.quantity;

        totalAmount += subTotal;
        totalQuantity += item.quantity;

        return {
            garmentTypeId: item.garmentTypeId,
            quantity: item.quantity,
            unitPrice: garment.basePrice,
            subTotal,
        };
    });

    const estimatedDeliveryDate =
        calculateEstimatedDeliveryDate(
            totalQuantity
        );

    const order = await prisma.order.create({
        data: {
            userId: data.userId,
            totalAmount,
            status: OrderStatus.RECEIVED,
            estimatedDeliveryDate,

            orderItems: {
                create: processedItems,
            },
        },
    });

    return order;
};

export const getOrders = async (
    userId: string,
    role: string
) => {
    const whereClause =
        role === "ADMIN"
            ? {}
            : {
                userId,
            };

    return prisma.order.findMany({
        where: whereClause,

        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    phone: true,
                },
            },

            orderItems: {
                include: {
                    garmentType: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });
};

export const getOrderById = async (
    orderId: string,
    userId: string,
    role: string
) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },

        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    phone: true,
                    role: true,
                },
            },

            orderItems: {
                include: {
                    garmentType: true,
                },
            },
        },
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (
        role !== "ADMIN" &&
        order.userId !== userId
    ) {
        throw new Error("Forbidden");
    }

    return order;
};

export const updateOrderStatus = async (
    orderId: string,
    status: OrderStatus
) => {
    const existingOrder =
        await prisma.order.findUnique({
            where: {
                id: orderId,
            },
        });

    if (!existingOrder) {
        throw new Error("Order not found");
    }

    if (
        existingOrder.status ===
        OrderStatus.DELIVERED
    ) {
        throw new Error(
            "Delivered orders cannot be updated"
        );
    }

    return prisma.order.update({
        where: {
            id: orderId,
        },

        data: {
            status,
        },
    });
};