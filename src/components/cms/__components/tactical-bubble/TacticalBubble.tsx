import React from "react";

import Link from "next/link";

import { MainBubble } from "@/components/cms/__components/tactical-bubble/MainBubble";
import { CmsTacticalBubbleFragment } from "@/types";

interface Props {
  tacticalBubble: CmsTacticalBubbleFragment;
}

export const TacticalBubble: React.FC<Props> = ({ tacticalBubble }) => {
  if (tacticalBubble.linkUrl) {
    return (
      <Link href={tacticalBubble.linkUrl}>
        <MainBubble tacticalBubble={tacticalBubble} />
      </Link>
    );
  }

  return <MainBubble tacticalBubble={tacticalBubble} />;
};
