import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import "@styles/app.scss";
import AuthMiddleware from "@/components/shared/AuthMiddleware"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IoT Monitoring",
  description: "IoT Monitoring Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthMiddleware>{children}</AuthMiddleware>
      </body>
    </html>
  );
}
