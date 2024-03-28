import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { FirstStep } from "./Stepper/FirstStep";
import { SecondStep } from "./Stepper/SecondStep";
import { Roles } from "@prisma/client";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { Toast, Variants } from "./Toast";

export interface ISetupForm {
  phoneNumber: string;
  companyName: string;
  city: string;
  deliveryMethod: string | null;
}

export const SetupModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const FORM_MAX_STEPS = 2;
  const [formStep, setFormStep] = useState<number>(1);

  const nextStepForm = () => {
    if (formStep < FORM_MAX_STEPS)
      setFormStep((currentStep) => currentStep + 1);
  };

  const prevStepForm = () => {
    if (formStep > 1) setFormStep((currentStep) => currentStep - 1);
  };

  const [currentUserRole, setCurrentUserRole] = useState<Roles | null>(null);

  const { register, getValues } = useForm<ISetupForm>();
  const [isFormError, setIsFormError] = useState(false);

  // const [isSignUpFinish, setIsSignUpFinish] = useState(false);

  const ctx = api.useContext();

  const { mutate, isLoading: isSettingUserRole } =
    api.users.setUserInfo.useMutation({
      onSuccess: () => {
        // setIsSignUpFinish(true);
        void ctx.users.getUser.invalidate();
      },
      onError: () => {
        console.log("Setting User Role Failed");
      },
    });

  const nextStep = (onClose: () => void) => {
    if (formStep == FORM_MAX_STEPS) {
      if (
        !getValues("city") ||
        !getValues("phoneNumber") ||
        !getValues("companyName") ||
        (currentUserRole === Roles.Shipper && !getValues("deliveryMethod"))
      ) {
        setIsFormError(true);
        return;
      }
      setIsFormError(false);
      finishStep();
      onClose();
      // setIsSignUpFinish(true);
    } else if (formStep < FORM_MAX_STEPS) {
      if (currentUserRole) nextStepForm();
    } else {
      onClose();
      setFormStep(1);
    }
  };

  const finishStep = () => {
    mutate({
      isSeller: currentUserRole === Roles.Seller ? true : false,
      companyName: getValues("companyName"),
      phoneNumber: getValues("phoneNumber"),
      city: getValues("city"),
      deliveryMethod: getValues("deliveryMethod")
        ? getValues("deliveryMethod")
        : null,
    });
  };

  // const onToastClose = () => {
  //   console.log("closed");
  //   setIsSignUpFinish(false);
  // };

  return (
    <>
      {/* Toast disapair after posting the request */}
      {/* {isSignUpFinish && (
        <Toast
          variant={Variants.success}
          message="Congratluation, You Have Completed the sign up process!"
          onClose={onToastClose}
        />
      )} */}
      <div className="w-full p-2">
        <div className="flex w-full items-center justify-between rounded-md bg-red-500 px-6 py-3 text-white">
          <span>You Sign up setup is not finished.</span>
          <Button
            variant="bordered"
            color="danger"
            className="border-white text-white"
            onPress={onOpen}
          >
            finish you setup
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Step {formStep} of {FORM_MAX_STEPS}
                  </ModalHeader>
                  <ModalBody>
                    {formStep === 1 && (
                      <FirstStep
                        currentUserRole={currentUserRole}
                        setCurrentUserRole={setCurrentUserRole}
                      />
                    )}
                    {formStep === 2 && (
                      <SecondStep
                        currentUserRole={currentUserRole}
                        register={register}
                        isFormError={isFormError}
                      />
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      isDisabled={isSettingUserRole}
                    >
                      Close
                    </Button>
                    {formStep > 1 && (
                      <Button
                        color="default"
                        onPress={() => prevStepForm()}
                        isDisabled={isSettingUserRole}
                      >
                        Prev
                      </Button>
                    )}
                    <Button
                      color="primary"
                      onPress={() => nextStep(onClose)}
                      isDisabled={isSettingUserRole || !currentUserRole}
                    >
                      {formStep < 2 ? "Next" : "Submit"}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  );
};
