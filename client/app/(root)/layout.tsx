import "@/app/globals.css";

import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import React from "react";
import Navbar from "@/app/shared/Navbar";
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
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="background-light850_dark100 relative">
        <Navbar />
        <div className="flex">
          <LeftSideBar />
          <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
            <div className="mx-auto w-full max-w-5xl"> {children}</div>
          </section>
          <RightSideBar />
        </div>
    </main>
  );
}
