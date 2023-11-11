import * as React from "react";

import Paragraph from "@/components/Paragraph";
import { NFTContext } from "../../context/NFTContext";

interface InputProps {
  title: string;
  placeholder: string;
  inputType: "input" | "textarea" | "number";
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const Input: React.FC<InputProps> = ({
  title,
  placeholder,
  inputType,
  handleChange,
}) => {
  const { nftCurrency } = React.useContext(NFTContext);
  const sharedClassname =
    "dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3";
  return (
    <div className="mt-10 w-full">
      <Paragraph title={title} className="text-xl" />

      {inputType === "number" && (
        <div className={`${sharedClassname} flexBetween flex-row`}>
          <input
            className="flex w-full dark:bg-nft-black-1 bg-white outline-none"
            type={inputType}
            placeholder={placeholder}
            onChange={handleChange}
          />
          <Paragraph title={nftCurrency} className="text-xl" />
        </div>
      )}

      {inputType === "textarea" && (
        <textarea
          rows={3}
          className={`${sharedClassname} resize-none`}
          placeholder={placeholder}
          onChange={handleChange}
        />
      )}

      {inputType === "input" && (
        <input
          className={sharedClassname}
          type={inputType}
          placeholder={placeholder}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default Input;
