"use client";

import { ThemeProvider } from "next-themes";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class">{children}</ThemeProvider>
);
