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
};

export const NFTContext = React.createContext<NFTContext>({
  currentAccount: "",
  nftCurrency: "ETH",
  connectWallet: () => new Promise((resolve) => resolve()),
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
    console.log("accounts: ", accounts);
    if (accounts?.length && typeof accounts[0] === "string") {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  };

  const connectWallet = async () => {
    if (!window?.ethereum) return alert("Please install MetaMask");
    const accounts = await window.ethereum.request<any[]>({
      method: "eth_requestAccounts",
    });
    if (accounts?.length) {
      setCurrentAccount(accounts[0]);
    }
    window.location.reload();
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
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
