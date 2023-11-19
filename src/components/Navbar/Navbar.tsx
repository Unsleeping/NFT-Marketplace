"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

import Image from "next/legacy/image";

import images from "@/assets";
import { ThemeToggler, MenuItems, ButtonGroup, Logo } from "./components";
import { useMountedTheme } from "@/hooks/useMountedTheme";

const Navbar = () => {
  const { theme, mounted } = useMountedTheme();
  const pathname = usePathname();
  const [active, setActive] = React.useState(pathname || "");
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    if (pathname) {
      setActive(pathname);
    }
  }, [pathname]);
  if (!mounted) {
    return null;
  }
  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Logo onClose={handleClose} />
      </div>
      <div className="mx-5 sm:hidden max-h-8 -mt-1.5">
        <w3m-button />
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
      <div className={`hidden md:flex ml-2 ${open && "ml-3"}`}>
        <Image
          src={open ? images.cross : images.menu}
          alt="menu"
          objectFit="contain"
          width={!open ? 24 : 20}
          height={!open ? 24 : 20}
          onClick={() => {
            setOpen((open) => !open);
          }}
          className={theme === "light" ? "filter invert" : undefined}
        />
        {open && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
            <div className="flex-1 p-4">
              <MenuItems
                active={active}
                setActive={setActive}
                isMobile
                onClose={handleClose}
              />
            </div>
            <div className="flex p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup
                router={router}
                setActive={setActive}
                isMobile
                onClose={handleClose}
              />
              <div className="ml-2 xs:hidden sm:block md:hidden max-h-8 -mt-0.5">
                <w3m-button />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
