import React from "react";

import { Input as NextUiInput, InputProps } from "@nextui-org/input";

export const Input: React.FC<InputProps> = (props) => {
  return (
    <NextUiInput
      classNames={{
        input: "bg-sand border-0 py-2 text-sm rounded-2xl",
        inputWrapper: "bg-sand rounded-2xl",
        mainWrapper: "bg-sand rounded-2xl",
      }}
      {...props}
    />
  );
};
