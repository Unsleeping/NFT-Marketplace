interface ButtonProps {
  title: string;
  classStyles?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({ title, classStyles, onClick }: ButtonProps) => (
  <button
    type="button"
    className={`nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white ${classStyles}`}
    onClick={onClick}
  >
    {title}
  </button>
);

export default Button;
