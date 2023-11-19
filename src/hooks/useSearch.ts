import { RenderableMarketItem } from "@/types";
import React from "react";

export const useSearch = (
  nfts: RenderableMarketItem[],
  setNfts: React.Dispatch<React.SetStateAction<RenderableMarketItem[]>>
) => {
  const [activeSelect, setActiveSelect] = React.useState("Recently added");
  const [nftsCopy, setNftsCopy] = React.useState<RenderableMarketItem[]>([]);

  const onHandleSearch = (value: string) => {
    const filteredNFTs = nftsCopy.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredNFTs.length) {
      setNfts(filteredNFTs);
    } else {
      setNfts([]);
    }
  };

  const onClearSearch = () => {
    setNfts(nftsCopy);
  };

  React.useEffect(() => {
    const sortedNfts = [...nfts];
    switch (activeSelect) {
      case "Recently added":
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      case "Price (low to high)":
        setNfts(sortedNfts.sort((a, b) => +a.price - +b.price));
        break;
      case "Price (high to low)":
        setNfts(sortedNfts.sort((a, b) => +b.price - +a.price));
        break;
      default:
        console.error("Invalid activeSelect");
        break;
    }
  }, [activeSelect]);

  return {
    nftsCopy,
    setNftsCopy,
    activeSelect,
    setActiveSelect,
    onHandleSearch,
    onClearSearch,
  } as const;
};
