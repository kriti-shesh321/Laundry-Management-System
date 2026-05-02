import { prisma } from "../lib/prisma";

export const getGarmentTypes = async () => {
    return prisma.garmentType.findMany({
        orderBy: {
            name: "asc",
        },
    });
};