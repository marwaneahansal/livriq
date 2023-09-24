import { useState } from "react";
import { Checkbox, cn } from "@nextui-org/react";

export const FirstStep = () => {
  const [isSeller, setIsSeller] = useState(false);
  const [isShipper, setIsShipper] = useState(false);

  const checkIsSeller = () => {
    setIsShipper(false);
    setIsSeller(true);
  };

  const checkIsShipper = () => {
    setIsSeller(false);
    setIsShipper(true);
  };

  return (
    <>
      <div className="space-y-4">
        <Checkbox
          aria-label="Seller"
          classNames={{
            base: cn(
              "inline-flex w-full max-w-md bg-content1",
              "hover:bg-content2 items-center justify-start",
              "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
              "data-[selected=true]:border-primary"
            ),
            label: "w-full",
          }}
          isSelected={isSeller}
          onValueChange={checkIsSeller}
        >
          <div className="flex w-full justify-between gap-2">
            <p>Seller</p>
          </div>
        </Checkbox>
        <Checkbox
          aria-label="Shipper"
          classNames={{
            base: cn(
              "inline-flex w-full max-w-md bg-content1",
              "hover:bg-content2 items-center justify-start",
              "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
              "data-[selected=true]:border-primary"
            ),
            label: "w-full",
          }}
          isSelected={isShipper}
          onValueChange={checkIsShipper}
        >
          <div className="flex w-full justify-between gap-2">
            <p>Shipper</p>
          </div>
        </Checkbox>
      </div>
    </>
  );
};
