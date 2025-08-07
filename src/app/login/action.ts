'use server';

import prisma from "@/lib/prisma";

export default async function Finduser(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || user.password !== password) {
        return { error: 'Invalid email or password' };
    }


    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    };
}
