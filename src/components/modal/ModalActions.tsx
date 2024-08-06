import React from "react";

import { ModalFooter } from "@nextui-org/modal";
import cx from "classnames";

const POSITIONS = {
  start: "justify-start",
  between: "justify-between",
  center: "justify-center",
  end: "justify-end",
} as const;

interface Props {
  children: React.ReactNode;
  position?: keyof typeof POSITIONS;
}

export const ModalActions: React.FC<Props> = ({
  children,
  position = "center",
}) => {
  return (
    <ModalFooter
      className={cx("flex px-2 lg:px-5 gap-2 lg:gap-4", POSITIONS[position])}
    >
      {children}
    </ModalFooter>
  );
};
