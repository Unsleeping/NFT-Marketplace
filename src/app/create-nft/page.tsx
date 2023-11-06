"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTheme } from "next-themes";

import { Button, Heading, Input, Paragraph } from "@/components";
import images from "@/assets";

const CreateNFT = () => {
  const { theme } = useTheme();
  const [fileUrl] = React.useState(null);
  const [formInput, setFormInput] = React.useState({
    price: "",
    name: "",
    description: "",
  });

  const onDrop = React.useCallback(() => {
    // upload image to the IPFS
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  const fileStyle = React.useMemo(
    () => `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
      ${isDragActive && " border-file-active"}
      ${isDragAccept && " border-file-accept"}
      ${isDragReject && " border-file-reject"}`,
    [isDragActive, isDragAccept, isDragReject]
  );
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <Heading title="Create new item" className="ml-4 xs:ml-0" />
        <div className="mt-16">
          <Paragraph title="Upload File" className="text-xl" />
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <Paragraph
                  title="JPG, PNG, GIF, WEBP, Max 5Mb."
                  className="text-xl"
                />
                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="file upload"
                    className={theme === "light" ? "filter invert" : undefined}
                  />
                </div>
                <Paragraph title="Drag and Drop File" className="text-sm" />
                <Paragraph
                  title="or Browse media on your device"
                  className="text-sm mt-2"
                />
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <Image src={fileUrl} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>
        <Input
          inputType="input"
          title="Name"
          placeholder="NFT Name"
          handleChange={(e) => {
            setFormInput({ ...formInput, name: e.target.value });
          }}
        />
        <Input
          inputType="textarea"
          title="Description"
          placeholder="NFT Description"
          handleChange={(e) => {
            setFormInput({ ...formInput, description: e.target.value });
          }}
        />
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleChange={(e) => {
            setFormInput({ ...formInput, price: e.target.value });
          }}
        />
        <div className="mt-7 w-full flex justify-end">
          <Button
            title="Create NFT"
            onClick={() => {}}
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
