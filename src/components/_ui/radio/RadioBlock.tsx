import React from "react";

import { RadioProps } from "@nextui-org/radio";
import { Radio, cn } from "@nextui-org/react";

interface Props extends RadioProps {
  children: React.ReactNode;
}

export const RadioBlock: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Radio
      {...rest}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-white",
          "w-full max-w-full flex-row cursor-pointer rounded-lg gap-2 p-4 border-2 border-dark-grey border-opacity-50",
          "data-[selected=true]:border-black",
        ),
        labelWrapper: "w-full",
      }}
    >
      {children}
    </Radio>
  );
};
