"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { Banner, CreatorCard } from "@/components";
import images from "@/assets";
import { makeId } from "../../utils/makeId";

// eslint-disable-next-line no-shadow
enum Direction {
  LEFT,
  RIGHT,
}

const Home = () => {
  const [hideArrows, setHideArrows] = React.useState(false);
  const { theme } = useTheme();
  const parentRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (direction: Direction) => {
    const { current } = scrollRef;
    const scrollAmount = window.innerWidth >= 2100 ? 270 : 222;
    if (current) {
      switch (direction) {
        case Direction.LEFT:
          current.scrollLeft -= scrollAmount;
          break;
        case Direction.RIGHT:
          current.scrollLeft += scrollAmount;
          break;
        default:
          break;
      }
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;
    if (current && parent) {
      if (current.scrollWidth >= parent.offsetWidth) {
        setHideArrows(false);
      } else {
        setHideArrows(true);
      }
    }
  };

  React.useEffect(() => {
    isScrollable();
    window.addEventListener("resize", isScrollable);
    return () => {
      window.removeEventListener("resize", isScrollable);
    };
  });

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          title="Discover, collect and sell extraordinary NFTs"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        />
        <div>
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            Best Creators
          </h1>
          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div
              className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
              ref={scrollRef}
            >
              {[6, 7, 8, 9, 10].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={
                    (images as any)[`creator${i}` as unknown as number]
                  }
                  creatorName={`0x${makeId(3)}...${makeId(4)}`}
                  creatorEths={10 - i * 0.5}
                />
              ))}
              {!hideArrows && (
                <>
                  <div
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                    onClick={() => {
                      handleScroll(Direction.LEFT);
                    }}
                  >
                    <Image
                      src={images.left}
                      layout="fill"
                      objectFit="contain"
                      alt="left_arrow"
                      className={
                        theme === "light" ? "fitler invert" : undefined
                      }
                    />
                  </div>
                  <div
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                    onClick={() => {
                      handleScroll(Direction.RIGHT);
                    }}
                  >
                    <Image
                      src={images.right}
                      layout="fill"
                      objectFit="contain"
                      alt="right_arrow"
                      className={
                        theme === "light" ? "fitler invert" : undefined
                      }
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
