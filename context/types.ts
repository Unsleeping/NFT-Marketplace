import { NFTForm, RenderableMarketItem } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type UploadToIPFS = (
  file: File,
  toThirdWebStorage: boolean
) => Promise<string | undefined>;

export type CreateNFT = (
  formInput: NFTForm,
  fileUrl: string,
  router: AppRouterInstance
) => Promise<void>;

export type FetchNFTs = () => Promise<RenderableMarketItem[]>;

export type Context = {
  currentAccount: string;
  nftCurrency: string;
  connectWallet: () => Promise<void>;
  uploadToIPFS: UploadToIPFS;
  createNFT: CreateNFT;
  fetchNFTs: FetchNFTs;
};
