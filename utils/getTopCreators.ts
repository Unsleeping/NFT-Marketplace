import { RenderableMarketItem } from "@/types";

export const getTopCreators = (nfts: RenderableMarketItem[]) => {
  const res: { sum: string; seller: string }[] = [];
  nfts.forEach((nft) => {
    const seller = res.find((i) => i.seller === nft.seller);
    if (!seller) {
      res.push({
        sum: nft.price,
        seller: nft.seller,
      });
    } else {
      const currentSumInNumber = Number(seller.sum);
      const priceInNumber = Number(nft.price);
      seller.sum = String(currentSumInNumber + priceInNumber);
    }
  });
  return res.sort((a, b) => (+a.sum > +b.sum ? -1 : 1));
};
