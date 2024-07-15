import React from "react";

export interface IToastProps {
  content: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export const Toast: React.FC<IToastProps> = ({ content, isOpen }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="bg-powder-dark text-black py-2 px-4 rounded-2xl">
      <div className="flex items-center text-sm justify-between gap-4">
        {content}
      </div>
    </div>
  );
};
