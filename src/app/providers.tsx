"use client";

import { ThemeProvider } from "next-themes";

import { NFTProvider } from "../../context/NFTContext";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <NFTProvider>
    <ThemeProvider attribute="class">{children}</ThemeProvider>
  </NFTProvider>
);
