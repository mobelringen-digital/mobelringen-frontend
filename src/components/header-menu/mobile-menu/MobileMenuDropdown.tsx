"use client";

import React from "react";

import cx from "classnames";

import { ArrowLeftAlt } from "@/components/icons/ArrowLeftAlt";

interface Props {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const MobileMenuDropdown: React.FC<Props> = (props) => {
  return (
    <div
      className={cx(
        "fixed p-4 z-200 bg-white top-0 left-0 bottom-0 right-0 transition-all duration-500 ease-in-out",
        {
          "translate-x-0": props.isActive,
          "translate-x-full": !props.isActive,
        },
      )}
    >
      <button
        className="flex gap-1 font-bold mb-6"
        onClick={() => props.setIsActive(false)}
      >
        <ArrowLeftAlt /> Tilbake
      </button>
      {props.children}
    </div>
  );
};
