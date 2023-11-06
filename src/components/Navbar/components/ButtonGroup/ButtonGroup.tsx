import * as React from "react";
import Button from "@/components/Button";
import { ROUTES } from "@/routes";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface ButtonGroupProps {
  router: AppRouterInstance;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ router, setActive }) => {
  const hasConnected = true;
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
    <Button title="Connect" className="mx-2 rounded-xl" onClick={() => {}} />
  );
};

export default ButtonGroup;
