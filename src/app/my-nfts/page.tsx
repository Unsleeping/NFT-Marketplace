"use client";

import * as React from "react";
import Image from "next/legacy/image";
import { useWeb3ModalSigner } from "@web3modal/ethers5/react";

import images from "../../assets";
import { NFTContext } from "../../../context/NFTContext";
import { RenderableMarketItem } from "@/types";
import { Banner, Loader, NFTCard, SearchBar } from "@/components";
import { shortenAddress } from "../../../utils/shortenAddress";
import { useSearch } from "@/hooks/useSearch";

//NFTs that you own, not listed for sale.
//When a user creates an NFT, it belongs to the market with the creator's ownership property.
//When another user buys it, the owner will now be the buyer, and the purchased NFT will appear on the "My NFTs" page.
//When you want to resell it to make a profit, you can list it. After such an action, your token will be removed from the "My NFTs" page and moved to the "Listed NFTs" page.
const MyNFTs = () => {
  //update on signer change
  const { signer } = useWeb3ModalSigner();
  const { fetchMyNFTsOrListedNFTs, currentAccount } =
    React.useContext(NFTContext);
  const [nfts, setNfts] = React.useState<RenderableMarketItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [isFirstFetchingDone, setIsFirstFetchingDone] = React.useState(false);
  const {
    nftsCopy,
    setNftsCopy,
    activeSelect,
    setActiveSelect,
    onHandleSearch,
    onClearSearch,
  } = useSearch(nfts, setNfts);

  React.useEffect(() => {
    if (signer && !isFirstFetchingDone) {
      fetchMyNFTsOrListedNFTs("fetchMyNFTs")
        .then((items) => {
          setIsLoading(false);
          setIsFirstFetchingDone(true);
          setNfts(items);
          setNftsCopy(items);
        })
        .catch((e) => {
          console.error(e);
          setIsError(true);
        });
    }
  }, [signer, isFirstFetchingDone]);

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        {process.env.NODE_ENV === "development" && (
          <>
            <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold mb-2">
              Error acquired. Try to clear cache on metamask:
            </h1>
            <a
              href={
                "https://medium.com/@thelasthash/solved-nonce-too-high-error-with-metamask-and-hardhat-adc66f092cd"
              }
              rel="noopener noreferrer"
            >
              Guideline for fixing the error
            </a>
          </>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          title="Your Nifty NFTs"
          childStyles="text-center mb-4"
          parentStyles="h-80 justify-center"
        />
        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full">
            <Image
              src={images.creator1}
              className="rounded-full object-cover"
              objectFit="cover"
            />
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">
            {shortenAddress(currentAccount)}
          </p>
        </div>
      </div>
      {!isLoading && !nfts.length && !nftsCopy.length ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl">
            No NFTs Owned
          </h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full min-md:w-4/5 flexCenter flex-col">
          <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
            <SearchBar
              activeSelect={activeSelect}
              setActiveSelect={setActiveSelect}
              handleSearch={onHandleSearch}
              clearSearch={onClearSearch}
            />
          </div>
          <div className="mt-3 w-full flex flex-wrap">
            {nfts.map((nft) => (
              <NFTCard
                nft={nft}
                key={`my-nft-${nft.tokenId}`}
                isOnProfilePage
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNFTs;
