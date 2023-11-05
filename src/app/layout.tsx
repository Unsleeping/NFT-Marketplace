import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import { Navbar, Footer } from "@/components";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NeverRest",
  description: "NFT Marketplace",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html suppressHydrationWarning lang="en">
    <body className={inter.className}>
      <Providers>
        <div className="dark:bg-nft-dark bg-white min-h-screen">
          <Navbar />
          <div className="pt-65"> {children}</div>
          <Footer />
        </div>
        <Script
          src="https://kit.fontawesome.com/a59aba01d6.js"
          crossOrigin="anonymous"
        />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
