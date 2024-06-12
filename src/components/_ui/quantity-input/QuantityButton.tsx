import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const QuantityButton: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      className="bg-sand w-[36px] h-[36px] flex items-center justify-center"
      {...rest}
    >
      {children}
    </button>
  );
};
