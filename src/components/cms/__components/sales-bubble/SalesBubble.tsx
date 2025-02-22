import React from "react";

import cx from "classnames";

import { CmsSalesBubbleFragment } from "@/types";
import { CAMPAIGN_COLORS } from "@/utils/helpers";

interface Props {
  salesBubble: CmsSalesBubbleFragment;
  size?: keyof typeof SIZE_VARIANTS;
}

const SIZE_VARIANTS = {
  default: "py-4 px-12",
  small: "py-2 px-10",
};

export const SalesBubble: React.FC<Props> = ({
  salesBubble,
  size = "default",
}) => {
  return (
    <div
      className={cx(
        "text-center rounded-full rounded-bl-none pointer-events-auto",
        SIZE_VARIANTS[size],
      )}
      style={{
        backgroundColor:
          CAMPAIGN_COLORS[salesBubble.backgroundColor ?? "MR_powder"],
        color: CAMPAIGN_COLORS[salesBubble.textColor ?? "MR_black"],
      }}
    >
      <ul className="flex justify-center items-center flex-col list-none">
        <li className="text-sm lg:text-base font-medium">
          {salesBubble.topLine}
        </li>
        <li className="text-2xl lg:text-3xl font-feature font-medium">
          {salesBubble.middleLine}
        </li>
        <li className="text-sm lg:text-base font-medium">
          {salesBubble.bottomLine}
        </li>
      </ul>
    </div>
  );
};
