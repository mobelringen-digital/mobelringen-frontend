import React from "react";

import cx from "classnames";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { BackgroundColor, CmsBlockConfigFragment, Spacing } from "@/types";

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

const BLOCK_SPACINGS_DESKTOP: Record<Spacing, string> = {
  small: "lg:py-8",
  medium: "lg:py-16",
  big: "lg:py-24",
};

const BLOCK_SPACINGS_MOBILE: Record<Spacing, string> = {
  small: "py-8",
  medium: "py-16",
  big: "py-24",
};

export const CmsBlockWrapper: React.FC<Props> = ({
  isFullWidth,
  children,
  config,
}) => {
  return (
    <section
      className={cx(
        "w-full",
        BACKGROUND_COLOR[config?.backgroundColor ?? "None"],
        BLOCK_SPACINGS_DESKTOP[config?.spacing?.desktop ?? "medium"],
        BLOCK_SPACINGS_MOBILE[config?.spacing?.mobile ?? "medium"],
      )}
    >
      <ContainerLayout fullWidth={isFullWidth}>{children}</ContainerLayout>
    </section>
  );
};
