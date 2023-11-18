import Link from "next/link";
import NAV_UL_DATA from "./utils";

interface MenuItemsProps {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  isMobile?: boolean;
}

const MenuItems = ({ active, setActive, isMobile }: MenuItemsProps) => (
  <ul
    className={`list-none flexCenter flex-row ${isMobile && "flex-col h-full"}`}
  >
    {NAV_UL_DATA.map(({ name, route }) => (
      <li
        key={route}
        onClick={() => {
          setActive(route);
        }}
        className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${
          active === route
            ? "dark:text-white text-nft-black-1"
            : "dark:text-nft-gray-3 text-nft-gray-2"
        } cursor-pointer`}
      >
        <Link href={route}>{name}</Link>
      </li>
    ))}
  </ul>
);

export default MenuItems;
