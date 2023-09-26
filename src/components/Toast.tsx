import { Button } from "@nextui-org/react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export enum Variants {
  success,
  danger,
}

export const Toast = ({
  variant,
  message,
  onClose,
}: {
  variant: Variants;
  message: string;
  onClose: () => void;
}) => {
  let bgColor = "bg-greeen-500";
  let txtColor = "white";

  if (variant === Variants.success) {
    bgColor = "bg-green-500";
    txtColor = "white";
  } else if (variant === Variants.danger) {
    bgColor = "bg-red-500";
    txtColor = "white";
  }

  const [isOpen, setIsOpen] = useState(true);

  const closeToast = () => {
    setIsOpen(false);
    onClose();
  };
  return (
    <>
      <div
        id="toast"
        className={`absolute right-8 top-1 flex items-center justify-between space-x-12 rounded-md ${bgColor} px-6 py-3 text-${txtColor} z-50 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <span>{message}</span>
        <Button
          variant="bordered"
          color={variant === Variants.success ? "success" : "danger"}
          className={`border-${txtColor} text-${txtColor}`}
          isIconOnly
          aria-label="Close"
          onPress={closeToast}
        >
          <IoMdClose />
        </Button>
      </div>
    </>
  );
};
