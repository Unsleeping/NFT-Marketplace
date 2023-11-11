"use client";
import React, { useState, useEffect } from "react";
import Web3Modal from "@web3modal/ethers5";
import { ethers } from "ethers";
import axios from "axios";

import { MarketAddress, MarketAddressABI } from "./constants";

type NFTContext = {
  nftCurrency: string;
};

export const NFTContext = React.createContext<NFTContext>({
  nftCurrency: "ETH",
});

type NFTProviderProps = {
  children: React.ReactNode;
};

export const NFTProvider = ({ children }: NFTProviderProps) => {
  const nftCurrency = "ETH";
  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
