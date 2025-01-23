import React from "react";

import cx from "classnames";

import Image from "next/image";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CmsBannerPromoFragment } from "@/types";
import { CAMPAIGN_COLORS, PARAGRAPH_STYLE } from "@/utils/helpers";

interface Props {
  data: CmsBannerPromoFragment;
}

export const BannerPromoTextWrapper: React.FC<Props> = ({ data }) => {
  const promo = data;

  return (
    <div
      className={cx("absolute top-10 left-0 right-0 lg:bottom-[40px] w-full")}
    >
      <ContainerLayout
        className={cx(
          "flex justify-center gap-2 font-feature font-semibold items-center flex-col",
        )}
      >
        <span
          className={cx(PARAGRAPH_STYLE[promo.textSize ?? "md"])}
          style={{
            color: CAMPAIGN_COLORS[promo.textColor ?? "MR_white"],
          }}
        >
          {promo.topLine}
        </span>
        {promo.promoImage ? (
          <Image
            src={promo.promoImage.url}
            alt={promo.topLine ?? "promo-image"}
            width={promo.promoImage.width ?? 200}
            height={promo.promoImage.height ?? 200}
          />
        ) : null}
        <span
          className={cx(PARAGRAPH_STYLE[promo.textSize ?? "md"])}
          style={{
            color: CAMPAIGN_COLORS[promo.textColor ?? "MR_white"],
          }}
        >
          {promo.bottomLine}
        </span>
      </ContainerLayout>
    </div>
  );
};
