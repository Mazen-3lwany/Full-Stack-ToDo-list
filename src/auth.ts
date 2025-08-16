import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {prisma} from "@/lib/prisma";
import authConfig from "./auth.config";
interface GithubProfile {
    login: string;
    id: string;
    avatar_url: string;
    name?: string;
    email?: string;
}
export const handler = NextAuth({
        callbacks:{
            async signIn({ user, account ,profile}) {
                // Allow both credentials and GitHub login
                if (account?.provider === "credentials" || account?.provider === "github") {
                    console.log("signIn error debug:", { user, account, profile })
                    return true;
                }
                return false;
            },
            async session({session,token}){
                if(token.sub && session.user){
                    session.user.id = token.sub;
                }
                if (session.user) {
                    session.user.name = token.name as string;
                    session.user.email = token.email as string;
                    session.user.image = token.image as string ; // Ensure image is set
                }
                return session;
            },
            async jwt({ token, user,account, profile }) {
                if(user){
                    token.sub=user.id;
                    token.name=user.name;
                    token.email=user.email;
                    
                }
                if(account?.provider=== "github" &&profile ){
                    const githubProfile = profile as GithubProfile;
                    token.image=githubProfile.avatar_url; // Use avatar_url for GitHub
                }
                return token;
            },
            
        },
        
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    debug:true,
    logger: {
        error(code, metadata) {
            console.error("🔴 NextAuth ERROR:", code, metadata)
        },
        warn(code) {
            console.warn("🟡 NextAuth WARN:", code)
        },
        debug(code, metadata) {
            console.debug("🔵 NextAuth DEBUG:", code, metadata)
        },
    },
    ...authConfig,
    
});
export const { signIn, signOut, auth } = handler; 
export const GET = handler;
export const POST = handler;
