'use server'
import { signIn } from "@/auth";

export async function signInUser(email: string, password: string) {
    await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
            callbackUrl: '/'
        });
}