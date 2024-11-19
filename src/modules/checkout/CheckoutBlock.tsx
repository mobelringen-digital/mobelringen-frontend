"use client";

import React from "react";

import cx from "classnames";

import { Blocks } from "@/modules/checkout/CheckoutSteps";

import { navigate } from "../../app/actions";

interface Props {
  position: number;
  title: string;
  description?: string;
  isActive: boolean;
  content: React.ReactNode;
  disabled?: boolean;
  type: Blocks;
}

export const CheckoutBlock: React.FC<Props> = ({
  position,
  title,
  isActive,
  content,
  disabled,
  type,
}) => {
  const navigateTo = async (step: Blocks) => {
    if (disabled) return;

    await navigate(`/cart/checkout?step=${step}`);
  };

  return (
    <div className="bg-white flex flex-col gap-6 rounded-2xl p-4 lg:p-8">
      <button
        aria-labelledby={title}
        disabled={disabled}
        onClick={() => navigateTo(type)}
        className="flex items-center gap-4"
      >
        <span
          className={cx(
            "w-[32px] font-semibold h-[32px] rounded-full p-2 flex items-center justify-center text-center",
            { "bg-black text-white": isActive },
            { "bg-cold-grey-dark text-dark-grey": !isActive },
          )}
        >
          {position}
        </span>
        <span className="flex flex-col">
          <h4
            className={cx("text-sm lg:text-xl", {
              "text-dark-grey": !isActive,
              "font-semibold": isActive,
            })}
          >
            {title}
          </h4>
        </span>
      </button>
      {isActive ? <div className="mt-2 lg:mt-4">{content}</div> : null}
    </div>
  );
};
