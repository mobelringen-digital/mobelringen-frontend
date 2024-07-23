import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

export const QuantityButton: React.FC<Props> = ({
  children,
  disabled,
  ...rest
}) => {
  return (
    <button
      disabled={disabled}
      className="bg-sand w-[36px] h-[36px] flex items-center justify-center z-20"
      {...rest}
    >
      {children}
    </button>
  );
};
