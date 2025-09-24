
// import NextAuth from "next-auth";
// import { NextRequest, NextResponse } from "next/server"
// import authConfig from "./auth.config";
// import {
//     DEFAULT_LOGIN_REDIRECT,
//     apiAuthPrefix,
//     authRoutes,
//     publicRoutes
// } from "./route";
// const { auth } = NextAuth(authConfig);

// interface AuthRequest extends NextRequest {
//     auth?: unknown;
// }

// interface AuthHandlerResponse {
//     (req: AuthRequest): Response | null | Promise<Response | null>;
// }

// export default auth((req: AuthRequest): Response | null => {
//     const { nextUrl } = req;
//     const isLoggedIn: boolean = !!req.auth;
//     const isApiAuthRoute: boolean = nextUrl.pathname.startsWith(apiAuthPrefix);
//     const isPublicRoute: boolean = publicRoutes.includes(nextUrl.pathname);
//     const isAuthRoute: boolean = authRoutes.includes(nextUrl.pathname);
//     if (isApiAuthRoute) return null;
//     if (isAuthRoute) {
//         if (isLoggedIn) {
//             return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//         }
//         return null;
//     }
//     if (!isLoggedIn && !isPublicRoute) {
//         let callbackUrl: string = nextUrl.pathname;
//         if (nextUrl.search) {
//             callbackUrl += nextUrl.search;
//         }
//         const encodedCallbackUrl: string = encodeURIComponent(callbackUrl);
//         return Response.redirect(
//             new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
//         );
//     }
//     return null;
// });

// export const config = {
//     matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// }
// middleware.ts

import { withAuth } from "next-auth/middleware";
import {  apiAuthPrefix, authRoutes, publicRoutes } from "./route";

export default withAuth({
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        authorized: ({ token, req }) => {
            const { pathname } = req.nextUrl;
            const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
            const isPublicRoute = publicRoutes.includes(pathname);
            const isAuthRoute = authRoutes.includes(pathname);
            if (isApiAuthRoute || isPublicRoute) return true;
            if (isAuthRoute && token) return true; // 
            return !!token; // If not an auth route, check if the user is authenticated
        },
    },
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
