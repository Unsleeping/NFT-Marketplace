"use client";

import React, { useState, useEffect } from "react";
import Web3Modal from "@web3modal/ethers5";
import { ethers } from "ethers";
import axios from "axios";

import { MarketAddress, MarketAddressABI } from "./constants";

type NFTContext = {
  currentAccount: string;
  nftCurrency: string;
  connectWallet: () => Promise<void>;
  uploadToIPFS: (
    file: File,
    toThirdWebStorage?: boolean
  ) => Promise<string | undefined>;
};

export const NFTContext = React.createContext<NFTContext>({
  currentAccount: "",
  nftCurrency: "ETH",
  connectWallet: () => new Promise((resolve) => resolve()),
  uploadToIPFS: (file: File, toThirdWebStorage?: boolean) =>
    new Promise((resolve) => resolve("")),
});

type NFTProviderProps = {
  children: React.ReactNode;
};

export const NFTProvider = ({ children }: NFTProviderProps) => {
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

  const uploadToIPFS = async (file: File, toThirdWebStorage = false) => {
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
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
