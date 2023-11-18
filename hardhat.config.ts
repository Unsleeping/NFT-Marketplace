import fs from "fs";
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";

// metamask private key
const privateKey = fs.readFileSync(".secret").toString().trim();

//https://docs.metamask.io/wallet/how-to/get-started-building/run-devnet/

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
  solidity: "0.8.19",
};

export default config;
