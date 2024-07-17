import React from "react";

import cx from "classnames";

interface Props {
  position: number;
  title: string;
  isActive: boolean;
  content: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const CheckoutBlock: React.FC<Props> = ({
  position,
  title,
  isActive,
  content,
  onClick,
  disabled,
}) => {
  return (
    <div className="bg-white flex flex-col gap-6 rounded-2xl p-4 lg:p-8">
      <button
        disabled={disabled}
        onClick={onClick}
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
        <h4
          className={cx("text-xl", {
            "text-dark-grey": !isActive,
            "font-semibold": isActive,
          })}
        >
          {title}
        </h4>
      </button>
      {isActive ? <div className="mt-8">{content}</div> : null}
    </div>
  );
};
