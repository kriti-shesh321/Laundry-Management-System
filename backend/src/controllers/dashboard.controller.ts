import { Request, Response } from "express";

import { getDashboardSummary } from "../services/dashboard.service";

export const getDashboardSummaryController =
    async (
        req: Request,
        res: Response
    ) => {
        try {
            const summary =
                await getDashboardSummary(
                    req.user!.id,
                    req.user!.role
                );

            return res.status(200).json({
                success: true,
                data: summary,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };