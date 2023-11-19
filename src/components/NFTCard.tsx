import * as React from "react";
import Image from "next/legacy/image";
import Link from "next/link";

import images from "@/assets";
import Paragraph from "@/components/Paragraph";
import { NFTContext } from "../../context/NFTContext";
import { shortenAddress } from "../../utils/shortenAddress";
import { RenderableMarketItem } from "@/types";
import { ROUTES } from "@/routes";

interface NFTCardProps {
  nft: RenderableMarketItem;
  isOnProfilePage?: boolean;
}

const NFTCard = ({ nft, isOnProfilePage }: NFTCardProps) => {
  const { nftCurrency } = React.useContext(NFTContext);
  const address = isOnProfilePage ? nft.owner : nft.seller;
  return (
    <Link href={{ pathname: ROUTES.NFT_DETAILS, query: { ...nft } }}>
      <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-32 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
        <div className="relative w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
          <Image
            src={nft.image ?? (images as any)[`nft${nft.tokenId}`]}
            layout="fill"
            objectFit="cover"
            alt={`nft${nft.tokenId}`}
          />
        </div>
        <div className="mt-3 flex flex-col">
          <Paragraph title={nft.name} className="text-sm minlg:text-xl" />
          <div className="flexBetween mt-1 minlg:mt-3 flew-row xs:flex-col xs:items-start xs:mt-3">
            <Paragraph
              title={
                <>
                  {(+nft.price).toFixed(3)}
                  &nbsp;
                  <span className="font-normal">{nftCurrency}</span>
                </>
              }
              className="text-xs minlg:text-lg"
            />
            <Paragraph
              title={address.length > 10 ? shortenAddress(address) : address}
              className="text-xs minlg:text-lg"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
