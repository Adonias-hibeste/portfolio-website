import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ConditionalNavbar } from "@/components/ConditionalNavbar";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: "Adonias Hibeste | Senior Mobile Developer",
  description: "Portfolio of Adonias Hibeste, a Senior Mobile Developer specializing in Flutter, React Native, and iOS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <AnalyticsProvider />
        <ConditionalNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
