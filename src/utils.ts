import { type AddResult } from "kubo-rpc-client/dist/src/types";
import { type Signer, ethers } from "ethers";
import { MarketAddress, MarketAddressABI } from "../context/constants";
import {
  MarketItem,
  type MarketContract,
  RenderableMarketItem,
  NFTItem,
} from "./types";
import axios from "axios";

export const getIPFSUrl = (addResult: AddResult) =>
  `https://unsleeping.infura-ipfs.io/ipfs/${addResult.cid}`;

export const fetchContract = (
  signerOrProvider?: Signer | ethers.providers.Provider
): MarketContract =>
  new ethers.Contract(
    MarketAddress,
    MarketAddressABI,
    signerOrProvider
  ) as unknown as MarketContract;

export const getRenderableData = async (
  data: MarketItem[],
  contract: MarketContract
): Promise<RenderableMarketItem[]> => {
  const items: RenderableMarketItem[] = await Promise.all(
    data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
      const tokenURI = await contract.tokenURI(tokenId);
      const {
        data: { image, name, description },
      } = await axios.get<
        any,
        { data: Omit<NFTItem, "price">; status: number }
      >(tokenURI);
      const price = ethers.utils.formatUnits(unformattedPrice, "ether");

      return {
        price,
        tokenId: tokenId.toNumber(),
        seller,
        owner,
        image,
        name,
        description,
        tokenURI,
      };
    })
  );
  return items;
};
