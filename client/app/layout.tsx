import "@/app/globals.css";

import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import React from "react";
import Navbar from "./shared/Navbar";
import LeftSideBar from "./home/LeftSideBar";
import Link from "next/link";
import { Button } from "@/helper/components/ui/button";
import RightSideBar from "./home/RightSideBar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-spaceGrotesk",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BuFFerOverflow",
  description: "A forum for secure web development",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
