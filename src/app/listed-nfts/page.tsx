"use client";

import * as React from "react";
import { useWeb3ModalSigner } from "@web3modal/ethers5/react";

import { Loader, NFTCard } from "@/components";
import { RenderableMarketItem } from "@/types";
import { NFTContext } from "../../../context/NFTContext";

const ListedNFTs = ({}) => {
  const { signer } = useWeb3ModalSigner();
  const { fetchMyNFTsOrListedNFTs } = React.useContext(NFTContext);
  const [nfts, setNfts] = React.useState<RenderableMarketItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [isFirstFetchingDone, setIsFirstFetchingDone] = React.useState(false);

  React.useEffect(() => {
    if (signer && !isFirstFetchingDone) {
      fetchMyNFTsOrListedNFTs("fetchItemsListed")
        .then((items) => {
          setIsLoading(false);
          setIsFirstFetchingDone(true);
          setNfts(items);
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

  if (!isLoading && nfts.length === 0) {
    return (
      <div className="flexCenter sm:p-4 p-16 min-h-screen">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
          No NFTs listed for Sale
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12 min-h-screen">
      <div className="w-full minmd:w-4/5">
        <div className="mt-4">
          <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold mt-2 ml-4 sm:ml-2">
            NFTs Listed for Sale
          </h2>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {nfts.map((nft) => (
              <NFTCard nft={nft} key={`listed-nft-${nft.tokenId}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListedNFTs;
