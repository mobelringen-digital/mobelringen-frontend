import React from "react";

import cx from "classnames";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";

interface Props {
  isFullWidth?: boolean;
  backgroundColor?: string;
  children: React.ReactNode;
}

export const CmsBlockWrapper: React.FC<Props> = ({
  isFullWidth,
  backgroundColor,
  children,
}) => {
  return (
    <div className={cx("py-16 w-full", backgroundColor)}>
      <ContainerLayout fullWidth={isFullWidth}>{children}</ContainerLayout>
    </div>
  );
};
