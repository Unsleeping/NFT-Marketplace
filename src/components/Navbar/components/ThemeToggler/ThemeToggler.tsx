"use client";

import * as React from "react";
import { useWeb3ModalTheme } from "@web3modal/ethers5/react";
import { useMountedTheme } from "@/hooks/useMountedTheme";

const ThemeToggler = () => {
  const { theme, setTheme, mounted } = useMountedTheme();
  const { setThemeMode } = useWeb3ModalTheme();
  React.useEffect(() => {
    setThemeMode(theme);
  }, [theme]);
  if (!mounted) {
    return false;
  }
  return (
    <>
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      <label
        htmlFor="checkbox"
        className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label"
      >
        <i className="fas fa-sun" />
        <i className="fas fa-moon" />
        <div className="rounded-full ball bg-white w-3 h-3 absolute" />
      </label>
    </>
  );
};

export default ThemeToggler;
