import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

import { prisma } from "../lib/prisma";
import { generateToken } from "../utils/jwt";

type RegisterInput = {
    name: string;
    phone: string;
    email: string;
    password: string;
};

export const registerUser = async (data: RegisterInput) => {
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email: data.email },
                { phone: data.phone },
            ],
        },
    });

    if (existingUser) {
        throw new Error("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            phone: data.phone,
            email: data.email,
            password: hashedPassword,
            role: Role.CUSTOMER,
        },
    });

    const token = generateToken({
        id: user.id,
        role: user.role,
    });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            role: user.role,
        },
    };
};

export const loginUser = async (
    email: string,
    password: string
) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid credentials.");
    }

    const token = generateToken({
        id: user.id,
        role: user.role,
    });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            role: user.role,
        },
    };
};