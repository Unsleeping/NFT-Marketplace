import { type AddResult } from "kubo-rpc-client/dist/src/types";
import { type Signer, ethers } from "ethers";
import { MarketAddress, MarketAddressABI } from "../context/constants";
import { type MarketContract } from "./types";

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
