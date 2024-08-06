import React from "react";

import { ModalBody } from "@nextui-org/modal";

interface Props {
  children: React.ReactNode;
}

export const ModalContent: React.FC<Props> = ({ children }) => {
  return <ModalBody className="py-6 px-2 lg:px-5">{children}</ModalBody>;
};
