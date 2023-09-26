import { Input } from "@nextui-org/react";
import { Roles } from "@prisma/client";
import type { UseFormRegister } from "react-hook-form";
import type { ISetupForm } from "../SetupModal";

export const SecondStep = ({
  currentUserRole,
  register,
  isFormError,
}: {
  currentUserRole: Roles | null;
  register: UseFormRegister<ISetupForm>;
  isFormError: boolean;
}) => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        {/* {currentUserRole === Roles.Seller && <SellerInfo />}
        {currentUserRole === Roles.Shipper && <ShipperInfo />} */}
        <Input
          type="text"
          label="Phone Number"
          placeholder="Enter Your Phone Number"
          {...register("phoneNumber", { required: true, min: 10 })}
        />
        <Input
          type="text"
          label="Company Name"
          placeholder="Enter Your Company Name"
          {...register("companyName", { required: true, min: 2 })}
        />
        <Input
          type="text"
          label="City"
          placeholder="Enter Your City"
          {...register("city", { required: true, min: 2 })}
        />
        {currentUserRole === Roles.Shipper && (
          <Input
            type="text"
            label="Delivery Method"
            placeholder="Enter Your Delivery Method"
            {...register("deliveryMethod", { required: true, min: 2 })}
          />
        )}
        {isFormError && (
          <p className="text-center text-sm text-red-600">Form is invalid</p>
        )}
      </div>
    </>
  );
};

const ShipperInfo = () => {
  return (
    <>
      <p>Shipper Info</p>
      <Input
        type="text"
        label="Phone Number"
        placeholder="Enter Your Phone Number"
      />
      <Input
        type="text"
        label="Company Name"
        placeholder="Enter Your Company Name"
      />
      <Input type="text" label="City" placeholder="Enter Your City" />
      <Input
        type="text"
        label="Delivery Method"
        placeholder="Enter Your Delivery Method"
      />
    </>
  );
};

const SellerInfo = () => {
  return (
    <>
      <p>Seller Info</p>
      <Input
        type="text"
        label="Phone Number"
        placeholder="Enter Your Phone Number"
      />
      <Input
        type="text"
        label="Company Name"
        placeholder="Enter Your Company Name"
      />
      <Input type="text" label="City" placeholder="Enter Your City" />
    </>
  );
};
