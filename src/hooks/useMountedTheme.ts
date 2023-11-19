"use client";

import React from "react";
import { useTheme } from "next-themes";

export const useMountedTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return { theme, mounted, setTheme } as const;
};
