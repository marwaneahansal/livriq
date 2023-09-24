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

export const SetupModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const FORM_MAX_STEPS = 2;
  const [formStep, setFormStep] = useState<number>(1);

  const nextStepForm = () => setFormStep((currentStep) => currentStep + 1);

  const prevStepForm = () => {
    if (formStep > 1) setFormStep((currentStep) => currentStep - 1);
  };

  const nextStep = (onClose: () => void) => {
    if (formStep < FORM_MAX_STEPS) nextStepForm();
    else {
      onClose();
      setFormStep(1);
    }
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
                    {formStep === 1 && <FirstStep />}
                    {formStep === 2 && <SecondStep />}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    {formStep > 1 && (
                      <Button color="default" onPress={() => prevStepForm()}>
                        Prev
                      </Button>
                    )}
                    <Button color="primary" onPress={() => nextStep(onClose)}>
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
