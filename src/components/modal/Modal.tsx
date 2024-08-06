import React from "react";

import {
  ModalContent,
  ModalHeader,
  ModalProps,
  Modal as NextUIModal,
} from "@nextui-org/modal";

type Props = ModalProps & {
  children: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ title, children, ...rest }) => {
  return (
    <NextUIModal
      size="2xl"
      className="mx-2"
      backdrop="blur"
      closeButton={null}
      {...rest}
    >
      <ModalContent className="bg-white rounded-2xl">
        <ModalHeader className="bg-cream text-3xl font-feature font-medium flex items-center px-2 lg:px-5 gap-1">
          {title}
        </ModalHeader>
        {children}
      </ModalContent>
    </NextUIModal>
  );
};
