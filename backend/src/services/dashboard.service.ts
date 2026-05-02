import { OrderStatus, Role } from "@prisma/client";

import { prisma } from "../lib/prisma";

export const getDashboardSummary = async (
    userId: string,
    role: Role
) => {
    const whereClause =
        role === Role.ADMIN
            ? {}
            : {
                userId,
            };

    const totalOrders =
        await prisma.order.count({
            where: whereClause,
        });

    const revenueAggregate =
        await prisma.order.aggregate({
            where: whereClause,

            _sum: {
                totalAmount: true,
            },
        });

    const orders = await prisma.order.findMany({
        where: whereClause,

        select: {
            status: true,
        },
    });

    const ordersByStatus = {
        RECEIVED: 0,
        PROCESSING: 0,
        READY: 0,
        DELIVERED: 0,
    };

    orders.forEach((order) => {
        ordersByStatus[
            order.status as OrderStatus
        ]++;
    });

    return {
        totalOrders,

        totalRevenue:
            revenueAggregate._sum.totalAmount || 0,

        ordersByStatus,
    };
};