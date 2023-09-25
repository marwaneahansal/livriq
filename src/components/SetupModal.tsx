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
import { Roles, User } from "@prisma/client";
import { api } from "~/utils/api";

export const SetupModal = ({
  currentUser,
}: {
  currentUser: User | null | undefined;
}) => {
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

  const ctx = api.useContext();

  const { mutate, isLoading: isSettingUserRole } =
    api.users.setUserInfo.useMutation({
      onSuccess: () => {
        void ctx.users.getUser.invalidate();
        nextStepForm();
        console.log("Setting User Role Successed");
      },
      onError: () => {
        console.log("Setting User Role Failed");
      },
    });

  const nextStep = (onClose: () => void) => {
    if (formStep == FORM_MAX_STEPS) {
      finishStep();
    } else if (formStep < FORM_MAX_STEPS) {
      nextStepForm();
    } else {
      onClose();
      setFormStep(1);
    }
  };

  const finishStep = () => {
    //! add the second form data
    mutate({ isSeller: currentUserRole === Roles.Seller ? true : false });
  };

  return (
    <>
      <div className="mb-10 w-full p-2">
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
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
                    {formStep === 2 && <SecondStep />}
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      disabled={isSettingUserRole}
                    >
                      Close
                    </Button>
                    {formStep > 1 && (
                      <Button
                        color="default"
                        onPress={() => prevStepForm()}
                        disabled={isSettingUserRole}
                      >
                        Prev
                      </Button>
                    )}
                    <Button
                      color="primary"
                      onPress={() => nextStep(onClose)}
                      disabled={isSettingUserRole}
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
