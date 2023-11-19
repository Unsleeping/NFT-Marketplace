"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";

import { Button, Heading, Input, Loader, Paragraph } from "@/components";
import images from "@/assets";
import { NFTForm } from "@/types";
import { NFTContext } from "../../../context/NFTContext";
import { useMountedTheme } from "@/hooks/useMountedTheme";

const CreateNFT = () => {
  const router = useRouter();
  const { uploadToIPFS, createNFT, isLoadingNFT } =
    React.useContext(NFTContext);
  const { theme, mounted } = useMountedTheme();
  const [fileUrl, setFileUrl] = React.useState("");
  const [formInput, setFormInput] = React.useState<NFTForm>({
    price: "",
    name: "",
    description: "",
  });

  const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
    const toThirdWebStorage = false;
    const file = acceptedFiles[0];
    //size limited exided => file = undefined
    if (!file) {
      return;
    }
    const url = await uploadToIPFS(file, toThirdWebStorage);
    if (url) {
      setFileUrl(url);
    }
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

  const handleCreateNFT = async () => {
    await createNFT(formInput, fileUrl, router);
  };

  if (!mounted) {
    return null;
  }

  if (isLoadingNFT) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

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
                  <Image
                    src={fileUrl}
                    width={300}
                    height={300}
                    objectFit="contain"
                    alt="asset_file"
                  />
                </div>
              </aside>
            )}
          </div>
        </div>
        <Input
          inputType="input"
          title="Name"
          value={formInput.name}
          placeholder="NFT Name"
          handleChange={(e) => {
            setFormInput({ ...formInput, name: e.target.value });
          }}
        />
        <Input
          inputType="textarea"
          title="Description"
          value={formInput.description}
          placeholder="NFT Description"
          handleChange={(e) => {
            setFormInput({ ...formInput, description: e.target.value });
          }}
        />
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          value={formInput.price}
          handleChange={(e) => {
            setFormInput({ ...formInput, price: e.target.value });
          }}
        />
        <div className="mt-7 w-full flex justify-end">
          <Button
            title="Create NFT"
            onClick={handleCreateNFT}
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
