import React from "react";

import cx from "classnames";

import Link from "next/link";

import { SalesBubble } from "@/components/cms/__components/sales-bubble/SalesBubble";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CmsSalesBubbleFragment, Position } from "@/types";

interface Props {
  data: CmsSalesBubbleFragment;
}

export const ImageLinkSalesBubbleWrapper: React.FC<Props> = ({ data }) => {
  const salesBubble = data;

  return (
    <div
      className={cx("absolute bottom-0 left-0 right-0 translate-y-1/2 w-full")}
    >
      <ContainerLayout
        className={cx("flex", {
          "justify-start": salesBubble.position === Position.Left,
          "justify-end": salesBubble.position === Position.Right,
          "justify-center": salesBubble.position === Position.Center,
        })}
      >
        {salesBubble.url ? (
          <Link aria-label={salesBubble.middleLine} href={salesBubble.url}>
            <SalesBubble size="small" salesBubble={salesBubble} />
          </Link>
        ) : (
          <SalesBubble size="small" salesBubble={salesBubble} />
        )}
      </ContainerLayout>
    </div>
  );
};
