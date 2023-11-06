import * as React from "react";

interface HeadingProps {
  title: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, className }) => (
  <h1
    className={`font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ${
      className ?? ""
    }`}
  >
    {title}
  </h1>
);

export default Heading;
