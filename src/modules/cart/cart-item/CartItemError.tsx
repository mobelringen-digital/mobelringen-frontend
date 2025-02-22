import React from "react";

import cx from "classnames";

import { Info } from "@/components/_ui/icons/figma/Info";

interface Props {
  message?: string | null;
  isError?: boolean | null;
}

export const CartItemError: React.FC<Props> = ({ message, isError }) => {
  if (!message) return null;

  return (
    <div
      className={cx("text-xs shrink-0 p-2.5 flex items-center gap-1", {
        "bg-error-light text-error rounded-lg": isError,
      })}
    >
      {isError ? (
        <div className="flex shrink-0 w-6 h-6">
          <Info fill="#c82b2b" />
        </div>
      ) : null}
      {message}
    </div>
  );
};
