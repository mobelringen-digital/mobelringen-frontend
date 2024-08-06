import React from "react";

import cx from "classnames";

const POSITIONS = {
  left: "justify-start text-left",
  center: "justify-center text-center",
  right: "justify-end text-right",
} as const;

interface Props {
  children: React.ReactNode;
  position?: keyof typeof POSITIONS;
}

export const PageTitle: React.FC<Props> = ({
  children,
  position = "center",
}) => {
  return (
    <div className={cx("flex", POSITIONS[position])}>
      <h1 className="font-feature text-4xl lg:text-5xl font-normal mb-8 lg:mb-12">
        {children}
      </h1>
    </div>
  );
};
