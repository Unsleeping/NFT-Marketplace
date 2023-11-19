"use client";

import * as React from "react";
import Image from "next/legacy/image";
import { useRouter, useSearchParams } from "next/navigation";

import images from "../../assets";
import { NFTContext } from "../../../context/NFTContext";
import { Button, Loader, Modal } from "@/components";
import { shortenAddress } from "../../../utils/shortenAddress";
import { RenderableMarketItem } from "@/types";
import { ROUTES } from "@/routes";

function isString(value: unknown): value is string {
  return typeof value === "string";
}

interface PaymentBodyProps {
  nft: RenderableMarketItem;
  nftCurrency: string;
}

const PaymentBody = ({ nft, nftCurrency }: PaymentBodyProps) => (
  <div className="flex flex-col">
    <div className="flexBetween">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
        Item
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
        Subtotal
      </p>
    </div>
    <div className="flexBetweenStart my-5">
      <div className="flex-1 flexStartCenter">
        <div className="relative w-28 h-28">
          <Image
            src={nft.image}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="flexCenterStart flex-col ml-5">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {shortenAddress(nft.seller)}
          </p>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {nft.name}
          </p>
        </div>
      </div>
      <div>
        <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl">
          {nft.price}&nbsp;
          <span className="font-semibold">{nftCurrency}</span>
        </p>
      </div>
    </div>
    <div className="flexBetween mt-10">
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-base minlg:text-xl">
        Total
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl">
        {nft.price}&nbsp;
        <span className="font-semibold">{nftCurrency}</span>
      </p>
    </div>
  </div>
);

const NFTDetails = () => {
  const { currentAccount, nftCurrency, buyNFT } = React.useContext(NFTContext);
  const [paymentModal, setPaymentModal] = React.useState(false);
  const [nft, setNft] = React.useState<RenderableMarketItem>({
    image: "",
    tokenId: 133794929294,
    name: "",
    owner: "",
    price: "",
    seller: "",
    description: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [successModal, setSuccessModal] = React.useState(false);
  const query = useSearchParams();
  const router = useRouter();
  React.useEffect(() => {
    if (query) {
      const seller = query.get("seller");
      const tokenId = query.get("tokenId");
      const price = query.get("price");
      const description = query.get("description");
      const name = query.get("name");
      const image = query.get("image");
      const owner = query.get("owner");

      if (
        isString(seller) &&
        isString(owner) &&
        isString(description) &&
        isString(tokenId) &&
        isString(name) &&
        isString(price) &&
        isString(image)
      ) {
        setNft({
          seller,
          owner,
          description,
          name,
          tokenId: +tokenId,
          price,
          image,
        });
        setIsLoading(false);
      } else {
        setIsError(true);
      }
    }
  }, [query]);
  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold mb-2">
          Error acquired while parsing query string
        </h1>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  const checkout = async () => {
    await buyNFT(nft);
    setPaymentModal(false);
    setSuccessModal(true);
  };

  return (
    <div className="relative flex justify-center md:flex-col min-h-screen">
      <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
        <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557">
          {nft?.image && (
            <Image
              src={nft.image}
              layout="fill"
              className="rounded-xl shadow-lg"
              alt="nft image"
            />
          )}
        </div>
      </div>
      <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4">
        <div className="flex flex-row sm:flex-col">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">
            {nft.name}
          </h2>
        </div>
        <div className="mt-10">
          <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">
            Creator
          </p>
          <div className="flex flex-row items-center mt-3">
            <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
              <Image
                src={images.creator1}
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-semibold">
              {shortenAddress(nft.seller)}
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col">
          <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row">
            <p className="font-poppins dark:text-white text-nft-black-1 text-base font-medium mb-2">
              Details
            </p>
          </div>
          <div className="mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal">
              {nft.description}
            </p>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col mt-10">
          {currentAccount.toLowerCase() === nft.seller.toLowerCase() ? (
            <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal border border-gray p-2">
              You cannot buy your own NFT
            </p>
          ) : (
            <Button
              title={`Buy for ${nft.price} ${nftCurrency}`}
              className="mr-5 sm:mr-0 rounded-xl"
              onClick={() => setPaymentModal(true)}
            />
          )}
        </div>
      </div>
      {paymentModal && (
        <Modal
          header="Check Out"
          body={<PaymentBody nft={nft} nftCurrency={nftCurrency} />}
          footer={
            <div className="flex flex-row sm:flex-col">
              <Button
                title="Checkout"
                className="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
                onClick={checkout}
              />
              <Button
                title="Cancel"
                className="rounded-xl nft-outlined"
                onClick={() => setPaymentModal(false)}
              />
            </div>
          }
          handleClose={() => setPaymentModal(false)}
        />
      )}
      {successModal && (
        <Modal
          header="Payment Successful"
          body={
            <div
              className="flexCenter flex-col text-center"
              onClick={() => setSuccessModal(false)}
            >
              <div className="relative w-52 h-52">
                <Image
                  src={nft.image}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
              <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl mt-10">
                You successfully purchased&nbsp;
                <span className="font-semibold">{nft.name}</span>
                &nbsp;from&nbsp;
                <span className="font-semibold">
                  {shortenAddress(nft.seller)}
                </span>
              </p>
            </div>
          }
          footer={
            <div className="flexCenter flex-col">
              <Button
                title="Check it out"
                className="sm:mb-5 rounded-xl"
                onClick={() => router.push(ROUTES.MY_NFTS)}
              />
            </div>
          }
          handleClose={() => setSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default NFTDetails;
