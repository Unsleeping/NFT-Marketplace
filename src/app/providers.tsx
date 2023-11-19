"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import { ThemeProvider } from "next-themes";
import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  gnosis,
  mainnet,
  optimism,
  polygon,
} from "@wagmi/chains";

import { NFTProvider } from "../../context/NFTContext";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

const chains = [
  mainnet,
  polygon,
  avalanche,
  arbitrum,
  bsc,
  optimism,
  gnosis,
  fantom,
];

const metadata = {
  name: "NeverRest",
  description: "NFT Marketplace",
  url: "http://localhost:3001/",
  icons: ["http://localhost:3001/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: chains.map((chain) => chain.id),
  projectId,
});

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <NFTProvider>
    <ThemeProvider attribute="class">{children}</ThemeProvider>
  </NFTProvider>
);
