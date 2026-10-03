import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhishek Kumar Singh | Software Developer",
  description:
    "Portfolio of Abhishek Kumar Singh — 4+ Years Experience Software Developer specializing in ReactJS, NextJS 14+, Node.js, Express, Webpack 5 Module Federation, Nx & Turborepo Monorepos, and TypeScript.",
  keywords: [
    "Abhishek Kumar Singh",
    "Software Developer",
    "Full-Stack Developer",
    "Node.js",
    "ReactJS",
    "NextJS",
    "Micro-Frontend",
    "Module Federation",
    "Monorepo",
    "Nx",
    "Turborepo",
    "TypeScript",
    "Kolkata Developer",
  ],
  authors: [{ name: "Abhishek Kumar Singh" }],
  openGraph: {
    title: "Abhishek Kumar Singh | Software Developer",
    description:
      "4+ Years Experience engineering scalable ReactJS, NextJS, Node.js, Micro-Frontend, and Monorepo web systems.",
    url: "https://abhisheksingh.dev",
    siteName: "Abhishek Kumar Singh Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-gray-100 selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
