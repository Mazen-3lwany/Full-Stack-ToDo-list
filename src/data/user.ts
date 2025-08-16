import { prisma } from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email },
    });
};

export const getUserByID = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};