interface ButtonProps {
  title: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({ title, className, onClick }: ButtonProps) => (
  <button
    type="button"
    className={`nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white ${
      className ?? ""
    }`}
    onClick={onClick}
  >
    {title}
  </button>
);

export default Button;
