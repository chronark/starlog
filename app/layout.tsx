import "tailwindcss/tailwind.css";
import { Inter } from "@next/font/google";

import { Analytics } from "@/app/components/analytics";
import { Banner } from "@/app/components/banner";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="min-h-screen">
        <Analytics />
        {/* <Header /> */}

        <Banner />
        <main>{children}</main>
      </body>
    </html>
  );
}
