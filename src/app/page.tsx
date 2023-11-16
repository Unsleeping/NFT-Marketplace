"use client";

import React from "react";
import Image from "next/legacy/image";
import { useTheme } from "next-themes";

import {
  Banner,
  CreatorCard,
  Heading,
  NFTCard,
  NFTMockedCard,
} from "@/components";
import images from "@/assets";
import { NFTContext } from "../../context/NFTContext";
import { RenderableMarketItem } from "@/types";

enum Direction {
  LEFT,
  RIGHT,
}

const MOCK_CREATOR_NAMES: Record<number, string> = {
  1: "0x75s...3dj4",
  2: "0x7dd...3gj4",
  3: "0x74s...55j4",
  4: "0x75s...fzj4",
  5: "0x7ds...g6j4",
  6: "0x7gs...cyj4",
  7: "0x1x...dsd4",
  8: "0xts...dgh4",
  9: "0xfds...dds4",
  10: "0xhds...gjh4",
};

const MOCK_PRICES: Record<number, number> = {
  1: 2.583053,
  2: 3.583053,
  3: 4.583053,
  4: 5.583053,
  5: 6.583053,
  6: 7.583053,
  7: 8.583053,
  8: 9.583053,
  9: 10.583053,
  10: 11.583053,
};

const Home = () => {
  const { fetchNFTs } = React.useContext(NFTContext);
  const [hideArrows, setHideArrows] = React.useState(false);
  const [nfts, setNfts] = React.useState<RenderableMarketItem[]>([]);
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

  React.useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items);
    });
  }, []);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        {/* <w3m-button /> */}
        <Banner
          title="Discover, collect and sell extraordinary NFTs"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left text-white"
        />
        <div>
          <Heading title="Best Creators" className="ml-4 xs:ml-0" />
          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div
              className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
              ref={scrollRef}
            >
              {[6, 7, 8, 9, 10].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={(images as any)[`creator${i}`]}
                  creatorName={MOCK_CREATOR_NAMES[i]}
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
        <div className="mt-10">
          <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <Heading title="Hot Bids" className="sm:mb-4 flex-1" />
            <div className="">SearchBar</div>
          </div>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {nfts.map((nft) => (
              <NFTCard key={`nft-${nft.tokenId}`} nft={nft} />
            ))}
            {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((nftIndex) => (
              <NFTMockedCard
                key={`nft-${nftIndex}-mocked`}
                nft={{
                  i: nftIndex,
                  name: `Nifty NFT ${nftIndex}`,
                  price: MOCK_PRICES[nftIndex],
                  seller: MOCK_CREATOR_NAMES[nftIndex],
                  owner: MOCK_CREATOR_NAMES[11 - nftIndex],
                  description: "Cool NFT on Sale",
                }}
              />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
