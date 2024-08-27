import React from "react";

import cx from "classnames";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { BackgroundColor, CmsBlockConfigFragment } from "@/types";

interface Props {
  isFullWidth?: boolean;
  children: React.ReactNode;
  config?: CmsBlockConfigFragment | null;
}

const BACKGROUND_COLOR: Record<BackgroundColor, string> & { None: "" } = {
  None: "",
  White: "bg-white",
  Yellow: "bg-cream",
  Pink: "bg-powder",
};

export const CmsBlockWrapper: React.FC<Props> = ({
  isFullWidth,
  children,
  config,
}) => {
  return (
    <div
      className={cx(
        "py-16 w-full",
        BACKGROUND_COLOR[config?.backgroundColor ?? "None"],
      )}
    >
      <ContainerLayout fullWidth={isFullWidth}>{children}</ContainerLayout>
    </div>
  );
};
