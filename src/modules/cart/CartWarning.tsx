import React from "react";

interface Props {
  message: string;
}

export const CartWarning: React.FC<Props> = ({ message }) => {
  return (
    <span className="bg-error-light text-error rounded-xl text-center w-full py-1 text-xs lg:text-sm">
      {message}
    </span>
  );
};
