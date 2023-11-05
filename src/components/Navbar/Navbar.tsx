"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import images from "@/assets";
import { useTheme } from "next-themes";
import { NAV_UL_DATA } from "./components/MenuItems";
import { ThemeToggler, MenuItems, ButtonGroup, Logo } from "./components";

const Navbar = () => {
  const { theme } = useTheme();
  const [active, setActive] = React.useState(NAV_UL_DATA[0].name);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Logo />
      </div>
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <ThemeToggler />
        </div>
        <div className="md:hidden flex">
          <MenuItems active={active} setActive={setActive} />
          <div className="ml-4">
            <ButtonGroup router={router} setActive={setActive} />
          </div>
        </div>
      </div>
      <div className="hidden md:flex ml-2">
        <Image
          src={open ? images.cross : images.menu}
          alt="menu"
          objectFit="contain"
          width={!open ? 25 : 20}
          height={!open ? 25 : 20}
          onClick={() => {
            setOpen(!open);
          }}
          className={theme === "light" ? "filter invert" : undefined}
        />
        {open && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
            <div className="flex-1 p-4">
              <MenuItems active={active} setActive={setActive} isMobile />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup router={router} setActive={setActive} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;