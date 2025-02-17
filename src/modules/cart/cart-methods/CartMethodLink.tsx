import React from "react";

import cx from "classnames";

interface Props {
  icon: React.ReactNode;
  setPreferredMethod: () => void;
  label: React.ReactNode;
  description: React.ReactNode;
  disabled?: boolean;
  isActive?: boolean;
}

export const CartMethodLink: React.FC<Props> = ({
  icon,
  setPreferredMethod,
  label,
  description,
  isActive,
}) => {
  return (
    <button
      aria-label="Select delivery"
      onClick={setPreferredMethod}
      className={cx(
        "relative text-left w-full px-4 py-1.5 lg:py-3 flex items-center gap-3 rounded-xl transition-all border hover:border-black",
        {
          "border-2 border-black shadow": isActive,
        },
        {
          "border-dark-grey border-opacity-50": !isActive,
        },
      )}
    >
      {icon}
      <div className="flex flex-col w-full">
        <span className="font-semibold">{label}</span>
        <span className="text-xs lg:text-sm font-normal text-dark-grey">
          {description}
        </span>
      </div>
    </button>
  );
};
