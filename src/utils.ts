import { AddResult } from "kubo-rpc-client/dist/src/types";

export const getIPFSUrl = (addResult: AddResult) => {
  return `https://unsleeping.infura-ipfs.io/ipfs/${addResult.cid}`;
};
