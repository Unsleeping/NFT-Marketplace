"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";

import { useWeb3ModalSigner } from "@web3modal/ethers5/react";
import {
  BuyNFT,
  Context,
  CreateNFT,
  CreateSale,
  FetchMyNFTsOrListedNFTs,
  FetchNFTs,
  UploadToIPFS,
} from "./types";
import { RenderableMarketItem } from "@/types";
import { fetchContract, getRenderableData } from "@/utils";
import { ROUTES } from "@/routes";

export const NFTContext = React.createContext<Context>({
  currentAccount: "",
  nftCurrency: "ETH",
  connectWallet: () => new Promise((resolve) => resolve()),
  uploadToIPFS: () => new Promise((resolve) => resolve("")),
  createNFT: () => new Promise((resolve) => resolve()),
  fetchNFTs: () => new Promise((resolve) => resolve([])),
  fetchMyNFTsOrListedNFTs: () => new Promise((resolve) => resolve([])),
  buyNFT: () => new Promise((resolve) => resolve()),
  createSale: () => new Promise((resolve) => resolve()),
});

type NFTProviderProps = {
  children: React.ReactNode;
};

export const NFTProvider = ({ children }: NFTProviderProps) => {
  const { signer } = useWeb3ModalSigner();
  const nftCurrency = "ETH";
  const [currentAccount, setCurrentAccount] = useState<string>("");

  const checkIfWalletIsConnected = async () => {
    if (!window?.ethereum) return alert("Please install MetaMask");
    const accounts = await window.ethereum.request<string[]>({
      method: "eth_accounts",
    });
    if (accounts?.length && typeof accounts[0] === "string") {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  };

  const connectWallet = async () => {
    if (!window?.ethereum) return alert("Please install MetaMask");
    const accounts = await window.ethereum.request<string[]>({
      method: "eth_requestAccounts",
    });
    if (accounts?.length && typeof accounts[0] === "string") {
      setCurrentAccount(accounts[0]);
    }
    window.location.reload();
  };

  const uploadToIPFS: UploadToIPFS = async (
    file,
    toThirdWebStorage = false
  ) => {
    try {
      const apiUrl = toThirdWebStorage
        ? "/api/thirdweb-ipfs"
        : "/api/infura-ipfs";
      const data = new FormData();
      data.append("name", "Image Upload");
      data.append("file_attachment", file);
      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data;",
        },
      });
      return response.data.url;
    } catch (e) {
      console.error(`Error uploading file to IPFS: ${e}`);
    }
  };

  const createNFT: CreateNFT = async (formInput, fileUrl, router) => {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) {
      return;
    }

    const response = await axios.post<
      any,
      { data: { url: string }; status: number }
    >("api/create-nft", {
      name,
      description,
      image: fileUrl,
    });
    if (response.status === 200) {
      await createSale(response.data.url, price);
      router.push(ROUTES.ROOT);
    }
  };

  const createSale: CreateSale = async (
    url: string,
    formInputPrice: string,
    isReselling?: boolean,
    id?: string
  ) => {
    if (!signer) {
      throw new Error("trying to fetch while signer is undefined");
    }
    const contract = fetchContract(signer);

    const price = ethers.utils.parseUnits(formInputPrice, "ether");
    const listingPrice = await contract.getListingPrice();

    const transaction = !isReselling
      ? await contract.createToken(url, price, {
          value: listingPrice.toString(),
        })
      : await contract.resellToken(ethers.BigNumber.from(id), price, {
          value: listingPrice.toString(),
        });
    await transaction.wait();
  };

  const fetchNFTs: FetchNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider); // to fetch all the NFTs from marketplace, not from a specific account

    const data = await contract.fetchMarketItems();

    const items = await getRenderableData(data, contract);

    return items;
  };

  const fetchMyNFTsOrListedNFTs: FetchMyNFTsOrListedNFTs = async (
    type: "fetchItemsListed" | "fetchMyNFTs"
  ) => {
    if (!signer) {
      throw new Error("trying to fetch while signer is undefined");
    }
    const contract = fetchContract(signer);
    const data =
      type === "fetchItemsListed"
        ? await contract.fetchItemsListed()
        : await contract.fetchMyNFTs();
    const items = await getRenderableData(data, contract);
    return items;
  };

  const buyNFT: BuyNFT = async (nft: RenderableMarketItem) => {
    if (!signer) {
      throw new Error("trying to buy while signer is undefined");
    }
    const contract = fetchContract(signer);

    const price = ethers.utils.parseUnits(nft.price, "ether");

    const tokenId = ethers.BigNumber.from(nft.tokenId);
    const transaction = await contract.createMarketSale(tokenId, {
      value: price,
    });

    await transaction.wait();
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        connectWallet,
        currentAccount,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
