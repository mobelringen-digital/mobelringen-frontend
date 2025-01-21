import React from "react";

import cx from "classnames";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { BackgroundColor, CmsBlockConfigFragment, Spacing } from "@/types";

interface Props {
  isFullWidth?: boolean;
  children: React.ReactNode;
  config?: CmsBlockConfigFragment | null;
  style?: React.CSSProperties;
  className?: string;
}

const BACKGROUND_COLOR: Record<BackgroundColor, string> & { None: "" } = {
  None: "",
  White: "bg-white",
  Yellow: "bg-cream",
  Pink: "bg-powder",
};

const BLOCK_SPACINGS_TOP_DESKTOP: Record<Spacing, string> = {
  small: "lg:pt-8",
  medium: "lg:pt-16",
  big: "lg:pt-24",
};

const BLOCK_SPACINGS_BOTTOM_DESKTOP: Record<Spacing, string> = {
  small: "lg:pb-8",
  medium: "lg:pb-16",
  big: "lg:pb-24",
};

const BLOCK_SPACINGS_TOP_MOBILE: Record<Spacing, string> = {
  small: "pt-8",
  medium: "pt-16",
  big: "pt-24",
};

const BLOCK_SPACINGS_BOTTOM_MOBILE: Record<Spacing, string> = {
  small: "pb-8",
  medium: "pb-16",
  big: "pb-24",
};

export const CmsBlockWrapper: React.FC<Props> = ({
  isFullWidth,
  children,
  config,
  style,
  className,
}) => {
  return (
    <section
      style={style}
      className={cx(
        "w-full",
        BACKGROUND_COLOR[config?.backgroundColor ?? "None"],
        BLOCK_SPACINGS_TOP_DESKTOP[config?.spacingTop?.desktop ?? "medium"],
        BLOCK_SPACINGS_BOTTOM_DESKTOP[
          config?.spacingBottom?.desktop ?? "medium"
        ],
        BLOCK_SPACINGS_TOP_MOBILE[config?.spacingTop?.mobile ?? "medium"],
        BLOCK_SPACINGS_BOTTOM_MOBILE[config?.spacingBottom?.mobile ?? "medium"],
        className
      )}
    >
      <ContainerLayout fullWidth={isFullWidth}>{children}</ContainerLayout>
    </section>
  );
};
