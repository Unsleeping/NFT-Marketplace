"use client";

import * as React from "react";
import Image from "next/legacy/image";

import images from "@/assets";
import Button from "@/components/Button";
import Paragraph from "@/components/Paragraph";
import FooterLinks from "./FooterLinks";
import { useMountedTheme } from "@/hooks/useMountedTheme";

const Footer = () => {
  const { theme, mounted } = useMountedTheme();
  if (!mounted) {
    return null;
  }
  return (
    <footer className="flexCenter flex-col border-t dark:border-nft-black-1 border-nft-gray-1 sm:py-8 py-16">
      <div className="w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16">
        <div className="flexStart flex-1 flex-col">
          <div className="flexCenter cursor-pointer">
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <Paragraph title="NeverRest" className="text-lg ml-1" />
          </div>
          <Paragraph
            title=" Get the latest updates"
            className="text-base mt-6"
          />
          <div className="flexBetween md:w-full minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 rounded-md">
            <input
              type="email"
              placeholder="Your Email"
              className="h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md dark:text-white text-nft-black-1 font-normal text-sx minlg:text-lg outline-none"
            />
            <div className="flex-initial">
              <Button title="Email me" className="rounded-md" />
            </div>
          </div>
        </div>
        <div className="flex-1 flexBetweenStart flex-wrap ml-10 md:ml-0 md:mt-8">
          <FooterLinks
            heading="NeverRest"
            items={["Explore", "How it Works", "Contact Us"]}
          />
          <FooterLinks
            heading="Support"
            items={[
              "Help center",
              "Terms of service",
              "Legal",
              "Privacy policy",
            ]}
          />
        </div>
      </div>
      <div className="flexCenter w-full mt-5 border-t dark:border-nft-black-1 border-nft-gray-1 sm:px-4 px-16">
        <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">
          <Paragraph
            title="NeverRest, Inc. All Rights Reserved."
            className="text-base"
          />
          <div className="flex flex-row sm:mt-4">
            {[
              images.instagram,
              images.twitter,
              images.telegram,
              images.discord,
            ].map((src, i) => (
              <div className="mx-2 cursor-pointer" key={i}>
                <Image
                  src={src}
                  objectFit="contain"
                  width={24}
                  height={24}
                  alt="social"
                  className={theme === "light" ? "filter invert" : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
