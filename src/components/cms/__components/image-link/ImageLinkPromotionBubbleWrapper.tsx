import React from "react";

import cx from "classnames";

import { PromotionBubble } from "@/components/cms/__components/promotion-bubble/PromotionBubble";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CmsPromotionBubbleFragment, Position } from "@/types";

interface Props {
  data: CmsPromotionBubbleFragment;
}

export const ImageLinkPromotionBubbleWrapper: React.FC<Props> = ({ data }) => {
  return (
    <div
      className={cx("absolute bottom-0 left-0 right-0 translate-y-1/2 w-full")}
    >
      <ContainerLayout
        className={cx("flex", {
          "justify-start": data.position === Position.Left,
          "justify-end": data.position === Position.Right,
          "justify-center": data.position === Position.Center,
        })}
      >
        <PromotionBubble data={data} />
      </ContainerLayout>
    </div>
  );
};
