import { Request, Response } from "express";

import { getGarmentTypes } from "../services/garment.service";

export const getGarmentTypesController =
    async (
        req: Request,
        res: Response
    ) => {
        try {
            const garments =
                await getGarmentTypes();

            return res.status(200).json({
                success: true,
                data: garments,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };