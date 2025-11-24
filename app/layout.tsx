import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adonias Hibeste | Mobile App Developer",
  description: "Portfolio of Adonias Hibeste, a creative Mobile App Developer based in Addis Ababa, Ethiopia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}
      >
        <AnalyticsProvider />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
