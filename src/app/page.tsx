"use client";

import React from "react";
import Image from "next/legacy/image";
import { useTheme } from "next-themes";

import {
  Banner,
  CreatorCard,
  Heading,
  Loader,
  NFTCard,
  SearchBar,
} from "@/components";
import images from "@/assets";
import { NFTContext } from "../../context/NFTContext";
import { RenderableMarketItem } from "@/types";
import { getTopCreators } from "../../utils/getTopCreators";
import { shortenAddress } from "../../utils/shortenAddress";
import { useSearch } from "@/hooks/useSearch";

enum Direction {
  LEFT,
  RIGHT,
}

const Home = () => {
  const { fetchNFTs } = React.useContext(NFTContext);
  const [hideArrows, setHideArrows] = React.useState(false);
  const [nfts, setNfts] = React.useState<RenderableMarketItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { theme } = useTheme();
  const parentRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const {
    nftsCopy,
    setNftsCopy,
    activeSelect,
    setActiveSelect,
    onHandleSearch,
    onClearSearch,
  } = useSearch(nfts, setNfts);

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
      setNftsCopy(items);
      setIsLoading(false);
    });
  }, []);

  const topCreators = getTopCreators(nftsCopy);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          title={
            <>
              Discover, collect and sell
              <br />
              extraordinary NFTs
            </>
          }
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left text-white"
        />

        {!isLoading && !nfts.length ? (
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            That&apos;s weird... No NFTs for sale!
          </h1>
        ) : isLoading ? (
          <Loader />
        ) : (
          <>
            <div>
              <Heading title="Top sellers" className="ml-4 xs:ml-0" />
              <div
                className="relative flex-1 max-w-full flex mt-3"
                ref={parentRef}
              >
                <div
                  className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
                  ref={scrollRef}
                >
                  {topCreators.map((creator, idx) => (
                    <CreatorCard
                      key={creator.seller}
                      rank={idx + 1}
                      creatorImage={(images as any)[`creator${idx + 1}`]}
                      creatorName={shortenAddress(creator.seller)}
                      creatorEths={+creator.sum}
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
                <Heading title="Hot NFTs" className="sm:mb-4 flex-1" />
                <div className="flex-2 sm:w-full flex-row flex sm:flex-col">
                  <SearchBar
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                    handleSearch={onHandleSearch}
                    clearSearch={onClearSearch}
                  />
                </div>
              </div>
              <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                {nfts.map((nft) => (
                  <NFTCard key={`nft-${nft.tokenId}`} nft={nft} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
