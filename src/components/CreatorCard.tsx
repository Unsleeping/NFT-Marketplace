import * as React from "react";
import Image, { type StaticImageData } from "next/legacy/image";

import images from "@/assets";
import Paragraph from "@/components/Paragraph";
import { NFTContext } from "../../context/NFTContext";

interface CreatorCardProps {
  rank: number;
  creatorImage: StaticImageData;
  creatorName: string;
  creatorEths: number;
}

const CreatorCard: React.FC<CreatorCardProps> = ({
  rank,
  creatorImage,
  creatorName,
  creatorEths,
}) => {
  const { nftCurrency } = React.useContext(NFTContext);
  return (
    <div className="relative min-w-190 minlg:min-w-240 dark:bg-nft-black-3 bg-white border dark:border-nft-black-3 border-nft-gray-1 rounded-3xl flex flex-col p-4 m-4">
      <div className="absolute w-8 h-8 minlg:w-10 minlg:h-10 bg-nft-red-violet flexCenter  rounded-full">
        <p className="font-poppins text-white font-semibold text-base minlg:text-lg">
          {rank}
        </p>
      </div>
      <div className="my-2 flex justify-center">
        <div className="relative w-20 h-20 minlg:w-28 minlg:h-28">
          <Image
            src={creatorImage}
            layout="fill"
            objectFit="cover"
            alt="creatorName"
            className="rounded-full"
          />
          <div className="absolute w-4 h-4 minlg:w-7 minlg:h-7 bottom-2 -right-0">
            <Image
              src={images.tick}
              layout="fill"
              objectFit="contain"
              alt="tick"
            />
          </div>
        </div>
      </div>
      <div className="mt-3 minlg:mt-7 text-center flexCenter flex-col">
        <Paragraph title={creatorName} className="text-base" />
        <Paragraph
          title={
            <>
              {creatorEths.toFixed(2)}
              &nbsp;
              <span className="font-normal">{nftCurrency}</span>
            </>
          }
          className="mt-1 text-base"
        />
      </div>
    </div>
  );
};

export default CreatorCard;
