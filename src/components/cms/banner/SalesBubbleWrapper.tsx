import React from "react";

import cx from "classnames";

import Link from "next/link";

import { CmsSalesBubble } from "@/components/cms/__components/sales-bubble/CmsSalesBubble";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CmsSalesBubbleFragment, Position } from "@/types";

interface Props {
  data: CmsSalesBubbleFragment;
}

export const SalesBubbleWrapper: React.FC<Props> = ({ data }) => {
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
          <Link href={salesBubble.url}>
            <CmsSalesBubble salesBubble={salesBubble} />
          </Link>
        ) : (
          <CmsSalesBubble salesBubble={salesBubble} />
        )}
      </ContainerLayout>
    </div>
  );
};
