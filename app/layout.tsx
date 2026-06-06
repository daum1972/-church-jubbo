import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "큰기쁨의교회 주보",
  description: "큰기쁨의교회 주일예배 주보입니다.",
  openGraph: {
    title: "큰기쁨의교회 주보",
    description: "큰기쁨의교회 주일예배 주보입니다.",
    url: "https://church-jubbo.vercel.app",
    siteName: "큰기쁨의교회 주보",
    images: "/image.png",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}