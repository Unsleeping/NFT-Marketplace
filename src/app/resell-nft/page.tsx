"use client";

import * as React from "react";

import { NFTContext } from "../../../context/NFTContext";
import { Button, Loader, Input } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { ROUTES } from "@/routes";
import { NFTItem } from "@/types";

const ResellNFT = () => {
  const { createSale, isLoadingNFT } = React.useContext(NFTContext);
  const query = useSearchParams();
  const router = useRouter();
  const tokenURI = query?.get("tokenURI");
  const tokenId = query?.get("tokenId");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");

  const fetchNFT = async () => {
    if (!tokenURI) return;

    const {
      data: { image },
    } = await axios.get<any, { data: Omit<NFTItem, "price"> }>(tokenURI);
    setImage(image);
  };

  const resell = async () => {
    if (!tokenURI || !tokenId) return;
    const isReselling = true;
    await createSale(tokenURI, price, isReselling, tokenId);
    router.push(ROUTES.ROOT);
  };

  React.useEffect(() => {
    if (tokenURI) {
      fetchNFT();
    }
  }, [tokenURI]);

  if (isLoadingNFT) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">
          Resell NFT
        </h1>
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleChange={(e) => setPrice(e.target.value)}
        />
        {image && (
          <img
            src={image}
            className="rounded mt-4"
            alt="nftImage"
            width={350}
          />
        )}

        <div className="mt-7 w-full flex justify-end">
          <Button title="List NFT" className="rounded-xl" onClick={resell} />
        </div>
      </div>
    </div>
  );
};

export default ResellNFT;
