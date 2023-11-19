import { BigNumber } from "ethers";

export type NFTItem = {
  price: string;
  name: string;
  description: string;
  image: string;
};

export type NFTForm = Omit<NFTItem, "image">;

export type MarketItem = {
  tokenId: BigNumber;
  price: BigNumber;
  seller: string;
  owner: string;
  sold?: boolean;
  description: string;
  name: string;
};

export type RenderableMarketItem = Omit<MarketItem, "tokenId" | "price"> & {
  tokenId: number;
  price: string;
  image: string; //todo maybe in smart contract also?
};

export type MarketContract = {
  updateListingPrice: (listingPrice: number) => Promise<void>;
  getListingPrice: () => Promise<number>;
  createToken: (
    url: string,
    price: BigNumber,
    message: { value: string }
  ) => Promise<{ wait: () => Promise<void> }>;
  createMarketItem: (tokenId: BigNumber, price: BigNumber) => Promise<void>;
  resellToken: (tokenId: BigNumber, price: BigNumber) => Promise<void>;
  createMarketSale: (tokenId: BigNumber) => Promise<void>;
  fetchMarketItems: () => Promise<MarketItem[]>;
  fetchMyNFTs: () => Promise<MarketItem[]>;
  fetchItemsListed: () => Promise<MarketItem[]>;
  tokenURI: (tokenId: BigNumber) => Promise<string>;
};
