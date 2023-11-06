import * as React from "react";

interface ParagraphProps {
  title: React.ReactNode;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ title, className }) => (
  <p
    className={`font-poppins dark:text-white text-nft-black-1 font-semibold ${
      className ?? ""
    }`}
  >
    {title}
  </p>
);

export default Paragraph;
