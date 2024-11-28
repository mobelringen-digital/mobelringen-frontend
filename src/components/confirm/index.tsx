import React from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

import { Button } from "@/components/_ui/button/Button";

interface Props {
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  content?: React.ReactNode;
  proceedText?: string;
  proceedButtonId?: string;
}

export const ModalConfirm: React.FC<Props> = ({
  onCancel,
  onConfirm,
  title,
  content,
  proceedText,
  proceedButtonId,
}) => {
  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      size="2xl"
      className="mx-2"
      backdrop="blur"
    >
      <ModalContent className="bg-white rounded-2xl">
        {(onClose) => (
          <>
            <ModalHeader className="bg-cream flex items-center px-2 lg:px-5 gap-1">
              {title}
            </ModalHeader>
            <ModalBody>{content}</ModalBody>
            <ModalFooter className="flex justify-between px-2 lg:px-5 gap-2 lg:gap-4">
              <Button
                aria-label="Avbryt"
                className="w-full"
                color="tertiary"
                onPress={() => {
                  onClose();
                  onCancel();
                }}
              >
                Avbryt
              </Button>
              <Button
                aria-label={proceedText ?? "Fortsette"}
                id={proceedButtonId}
                className="w-full"
                color="primary"
                onPress={onConfirm}
              >
                {proceedText ?? "Fortsette"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
