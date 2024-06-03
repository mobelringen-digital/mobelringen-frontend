import React from "react";

import cx from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const ContainerLayout: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cx("container mx-auto px-4 lg:px-6", className)}>
      {children}
    </div>
  );
};
