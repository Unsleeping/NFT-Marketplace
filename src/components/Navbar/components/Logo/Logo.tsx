import * as React from "react";
import Link from "next/link";
import Image from "next/legacy/image";

import images from "@/assets";
import Paragraph from "@/components/Paragraph";
import { ROUTES } from "@/routes";

const LogoImage = () => (
  <Image
    src={images.logo02}
    objectFit="contain"
    width={32}
    height={32}
    alt="logo"
  />
);

type LogoProps = {
  onClose: () => void;
};

const Logo = ({ onClose }: LogoProps) => (
  <>
    <Link href={ROUTES.ROOT}>
      <div className="flexCenter md:hidden cursor-pointer">
        <LogoImage />
        <Paragraph title="NeverRest" className="text-lg ml-1" />
      </div>
    </Link>
    <Link href={ROUTES.ROOT}>
      <div className="hidden md:flex" onClick={onClose}>
        <LogoImage />
      </div>
    </Link>
  </>
);

export default Logo;
