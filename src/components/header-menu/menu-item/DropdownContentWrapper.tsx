import React from "react";

import cx from "classnames";

interface Props {
  isActive: boolean;
  children: React.ReactNode;
}

export const DropdownContentWrapper: React.FC<Props> = ({
  isActive,
  children,
}) => {
  return (
    <div
      className={cx(
        "absolute top-[80px] left-0 right-0 transition duration-500 ease-in-out z-30 w-full transform max-h-[calc(100vh-80px)] overflow-auto",
        {
          "opacity-100 visible translate-y-0": isActive,
          "opacity-0 invisible -translate-y-4": !isActive,
        },
      )}
    >
      <div className="bg-white w-full shadow-xl">
        <div className="border-t border-t-cold-grey-dark" />
        <div className="container mx-auto p-4 relative z-10">{children}</div>
      </div>
    </div>
  );
};
