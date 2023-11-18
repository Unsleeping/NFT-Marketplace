// npx hardhat run scripts/deploy.ts --network localhost

// Compiled 13 Solidity files successfully (evm target: paris).
// NFTMarketplace deployed to:

// MarketAddress
// 0x5FbDB2315678afecb367f032d93F642f64180aa3

// it is compile version of a contract (every time we build the contract, u should update it)
// don't forget to copy the <ContractName>.json file to the context from artifacts/<ContractName>.sol/ <ContractName>.json

import market from "./NFTMarketplace.json";

export const MarketAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const MarketAddressABI = market.abi;
