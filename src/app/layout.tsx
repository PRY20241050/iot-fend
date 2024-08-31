import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import "@styles/app.scss";
import AuthMiddleware from "@/components/shared/AuthMiddleware";
import { Toaster } from "@/components/ui/toaster";

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
      <body id="root-body" className={inter.className}>
        <AuthMiddleware>{children}</AuthMiddleware>
        <Toaster />
      </body>
    </html>
  );
}
