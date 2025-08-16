"use server";

import * as z from "zod";
// import  AuthError  from "next-auth";

import bcrypt from "bcryptjs";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/indix";
import { getUserByEmail } from "@/data/user";
// import { sendVerificationEmail } from "@/lib/mail";
// import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";


export const login = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null
) => {
    const validatedFields= LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        throw new Error("Invalid login credentials");
    }
    const { email, password } = validatedFields.data;
    //get data from database
    const existingUser  = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" };
    }

    // Check if the password matches
    const passwordsMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordsMatch) {
        return { error: "Incorrect password!" };
    }
    // Sign in the user
    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
        });

    }catch (error) {
        // if (error instanceof AuthError) {
        //     const authError = error as InstanceType<typeof AuthError>;
        //     switch (authError.type) {
        //         case "CredentialsSignin":
        //             return { error: "Invalid credentials!" };
        //         default:
        //             return { error: "Something went wrong!" };
        //     }
        // }
        throw error;
    }
    


}