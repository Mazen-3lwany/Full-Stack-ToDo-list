'use client';
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap'
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const bodyClass = `${geistSans.variable} ${geistMono.variable} antialiased`;

  return (
    <html lang="en">
      <body className={bodyClass}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
