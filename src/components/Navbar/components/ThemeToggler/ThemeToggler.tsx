"use client";

import * as React from "react";
import { useTheme } from "next-themes";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
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
