import React from "react";

import cx from "classnames";

import { SupplementBubble } from "@/components/cms/__components/tactical-bubble/SupplementBubble";
import { BubblePosition, CmsTacticalBubbleFragment, MrColor } from "@/types";
import { CAMPAIGN_COLORS } from "@/utils/helpers";

interface Props {
  tacticalBubble: CmsTacticalBubbleFragment;
  size?: keyof typeof SIZE_VARIANTS;
}

const POSITION_CLASSES: Record<BubblePosition, string> = {
  TOP_LEFT: "top-16 left-8",
  TOP_RIGHT: "top-16 right-12",
  CENTER: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  BOTTOM_LEFT: "bottom-8 left-8",
  BOTTOM_RIGHT: "bottom-8 right-12",
};

const SIZE_VARIANTS = {
  default: "py-3 px-6",
  small: "py-2 px-4",
};

export const MainBubble: React.FC<Props> = ({
  tacticalBubble,
  size = "default",
}) => {
  const isSupplementBubble =
    !!tacticalBubble.supplementBubbleMiddleLine ||
    !!tacticalBubble.supplementBubbleTopLine;

  return (
    <div
      className={cx(
        "absolute",
        POSITION_CLASSES[tacticalBubble.position ?? "TOP_LEFT"],
      )}
    >
      <div
        className={cx(
          "text-center rounded-full rounded-bl-none min-w-44",
          SIZE_VARIANTS[size],
        )}
        style={{
          backgroundColor:
            CAMPAIGN_COLORS[
              tacticalBubble.mainBubbleBackgroundColor ?? "MR_powder"
            ],
          color:
            CAMPAIGN_COLORS[tacticalBubble.mainBubbleTextColor ?? "MR_black"],
        }}
      >
        {isSupplementBubble ? (
          <SupplementBubble
            topLine={tacticalBubble.supplementBubbleTopLine}
            middleLine={tacticalBubble.supplementBubbleMiddleLine}
            backgroundColor={
              CAMPAIGN_COLORS[
                tacticalBubble.supplementBubbleBackgroundColor ?? MrColor.MrRed
              ]
            }
            textColor={
              CAMPAIGN_COLORS[
                tacticalBubble.supplementBubbleTextColor ?? MrColor.MrWhite
              ]
            }
          />
        ) : null}
        <ul
          className={cx("flex flex-col list-none", {
            "justify-start items-start": isSupplementBubble,
            "justify-center items-center": !isSupplementBubble,
          })}
        >
          <li className="text-sm font-medium">
            {tacticalBubble.mainBubbleTopLine}
          </li>
          <li className="text-2xl lg:text-3xl font-feature font-medium text-nowrap">
            {tacticalBubble.mainBubbleMiddleLine}
          </li>
          <li className="text-sm font-medium">
            {tacticalBubble.mainBubbleBottomLine}
          </li>
        </ul>
      </div>
    </div>
  );
};
