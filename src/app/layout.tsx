"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { type ReactNode } from "react";
import { cookieToInitialState } from "wagmi";

import Providers from "./Web3Providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
