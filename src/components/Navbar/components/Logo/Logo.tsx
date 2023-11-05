import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import images from "@/assets";

const LogoImage = () => (
  <Image
    src={images.logo02}
    objectFit="contain"
    width={32}
    height={32}
    alt="logo"
  />
);

const Logo = () => (
  <>
    <Link href="/">
      <div className="flexCenter md:hidden cursor-pointer" onClick={() => {}}>
        <LogoImage />
        <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
          NeverRest
        </p>
      </div>
    </Link>
    <Link href="/">
      <div className="hidden md:flex" onClick={() => {}}>
        <LogoImage />
      </div>
    </Link>
  </>
);

export default Logo;
