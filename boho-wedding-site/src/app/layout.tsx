import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Maya & Ilay's Wedding",
  description: "Join us for our special day - a beautiful boho morning wedding celebration",
  icons: {
    icon: [
      { url: '/golden-rings.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }
    ],
    apple: { url: '/golden-rings.svg', type: 'image/svg+xml' },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/golden-rings.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/golden-rings.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:wght@400;500;600&family=Montserrat:wght@300;400;500&family=Heebo:wght@300;400;500;700&family=Amatic+SC:wght@400;700&family=Bellefair&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.variable + " antialiased"}>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
