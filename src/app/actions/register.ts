"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from  "@/schemas/indix";
import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/data/user";
// import { generateVerificationToken } from "@/lib/tokens";
// import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    const { email, name, password } = validatedFields.data;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if the user already exists
    const existingUser = await getUserByEmail(email);
    // If the user exists, return an error
    if (existingUser) {
        return { error: "Email already in use!" };
    }
    // Create the user in the database
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

//   const verificationToken = await generateVerificationToken(email);
//   await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { sucess: "Confirmation email sent!" };
};