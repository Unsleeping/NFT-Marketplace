import * as React from "react";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import Button from "@/components/Button";
import { ROUTES } from "@/routes";
import { NFTContext } from "../../../../../context/NFTContext";

interface ButtonGroupProps {
  router: AppRouterInstance;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ router, setActive }) => {
  const { connectWallet, currentAccount } = React.useContext(NFTContext);
  const hasConnected = !!currentAccount;
  return hasConnected ? (
    <Button
      title="Create"
      className="mx-2 rounded-xl"
      onClick={() => {
        setActive("");
        router.push(ROUTES.CREATE_NFT);
      }}
    />
  ) : (
    <Button
      title="Connect"
      className="mx-2 rounded-xl"
      onClick={connectWallet}
    />
  );
};

export default ButtonGroup;
