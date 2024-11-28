import React from "react";

import cx from "classnames";

import Link from "next/link";

import { SalesBubble } from "@/components/cms/__components/sales-bubble/SalesBubble";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CmsSalesBubbleFragment, Position } from "@/types";

interface Props {
  data: CmsSalesBubbleFragment;
}

export const BannerSalesBubbleWrapper: React.FC<Props> = ({ data }) => {
  const salesBubble = data;

  return (
    <div
      className={cx(
        "absolute bottom-0 left-0 right-0 translate-y-1/2 lg:translate-y-0 lg:bottom-[40px] w-full",
      )}
    >
      <ContainerLayout
        className={cx("flex justify-center", {
          "lg:justify-start": salesBubble.position === Position.Left,
          "lg:justify-end": salesBubble.position === Position.Right,
        })}
      >
        {salesBubble.url ? (
          <Link aria-label={salesBubble.middleLine} href={salesBubble.url}>
            <SalesBubble salesBubble={salesBubble} />
          </Link>
        ) : (
          <SalesBubble salesBubble={salesBubble} />
        )}
      </ContainerLayout>
    </div>
  );
};
