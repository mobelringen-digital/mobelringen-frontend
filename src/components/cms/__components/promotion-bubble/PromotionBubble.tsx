import React from "react";

import cx from "classnames";

import Link from "next/link";

import { Button } from "@/components/_ui/button/Button";
import { CmsPromotionBubbleFragment } from "@/types";
import { CAMPAIGN_COLORS } from "@/utils/helpers";

interface Props {
  data: CmsPromotionBubbleFragment;
}

export const PromotionBubble: React.FC<Props> = ({ data }) => {
  return (
    <div
      className={cx(
        "text-center rounded-[56px] rounded-bl-none p-6 lg:p-12 max-w-[700px]",
      )}
      style={{
        backgroundColor: CAMPAIGN_COLORS[data.backgroundColor ?? "MR_powder"],
        color: CAMPAIGN_COLORS[data.textColor ?? "MR_black"],
      }}
    >
      <ul className="flex justify-center items-center flex-col list-none gap-2 lg:gap-8">
        <li className="text-lg lg:text-3xl font-feature">{data.topLine}</li>
        <li className="text-sm lg:text-base">{data.middleLine}</li>
      </ul>
      {data.links ? (
        <ul className="flex justify-center gap-2 lg:gap-4 mt-2 lg:mt-8">
          {data.links.map((link, index) => (
            <li key={index}>
              <Button
                aria-label={link.label}
                color="tertiary"
                as={Link}
                href={link.url}
              >
                {link.label}
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
