import { Request, Response } from "express";

import { prisma } from "../lib/prisma";

import {
    loginSchema,
    registerSchema,
} from "../services/auth.validation";

import {
    loginUser,
    registerUser,
} from "../services/auth.service";

export const register = async (
    req: Request,
    res: Response
) => {
    try {
        const validatedData = registerSchema.parse(req.body);

        const result = await registerUser(validatedData);

        return res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const login = async (
    req: Request,
    res: Response
) => {
    try {
        const validatedData = loginSchema.parse(req.body);

        const result = await loginUser(
            validatedData.email,
            validatedData.password
        );

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMe = async (
    req: Request,
    res: Response
) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user?.id,
            },
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};