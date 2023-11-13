"use client";

import { ThemeProvider } from "next-themes";
import { ThirdwebProvider } from "@thirdweb-dev/react";

import { NFTProvider } from "../../context/NFTContext";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <NFTProvider>
    <ThirdwebProvider clientId={process.env.NEXT_PUBLIC_THIRDWEB_API_KEY}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </ThirdwebProvider>
  </NFTProvider>
);
