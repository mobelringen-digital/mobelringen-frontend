import React, { Suspense } from "react";

import cx from "classnames";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";

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
    <Suspense fallback={<PageTopLoader />}>
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
    </Suspense>
  );
};
