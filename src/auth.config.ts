import bcrypt from "bcryptjs";

import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { LoginSchema } from "@/schemas/indix";
import { getUserByEmail } from "@/data/user";   

const authOptions= {
    providers:[
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            // authorization: { params: { scope: "read:user user:email" } },
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    email: profile.email || `${profile.login}@users.noreply.github.com`,
                    password: null, // Explicitly set to null
                    image: profile.picture,
                };
            },
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    console.log("passwordsMatch", passwordsMatch);
                    console.log("user", email);
                    console.log("user", user);
                    
                    if (passwordsMatch) return user;
                }
            return null;
            },
        }),
        
    ],
}   
export default authOptions;


