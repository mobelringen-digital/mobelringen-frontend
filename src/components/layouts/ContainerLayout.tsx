import React from "react";

import cx from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const ContainerLayout: React.FC<Props> = ({
  children,
  className,
  fullWidth,
}) => {
  return (
    <div
      className={cx(
        {
          "mx-auto px-4 lg:px-6 container": !fullWidth,
          "px-8": fullWidth,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};
