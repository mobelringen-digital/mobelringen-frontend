import React from "react";

import cx from "classnames";

import Image from "next/image";

import { CmsBannerPromoFragment, PromoPosition } from "@/types";
import { CAMPAIGN_COLORS, PARAGRAPH_STYLE } from "@/utils/helpers";

interface Props {
  data: CmsBannerPromoFragment;
}

const POSITION: Record<PromoPosition, string> = {
  CENTER_TOP: "top-8 left-0 right-0",
  CENTER_CENTER: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
};

export const BannerPromoTextWrapper: React.FC<Props> = ({ data }) => {
  const promo = data;

  return (
    <div
      className={cx("absolute top-0 left-0 right-0 bottom-0 w-full", {
        "bg-black bg-opacity-50": data.backgroundOverlay,
      })}
    >
      <div
        className={cx(
          "absolute",
          POSITION[promo.position ?? "CENTER_TOP"],
          "flex flex-col items-center justify-center text-center",
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
            className="max-w-full max-h-52 object-contain"
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
      </div>
    </div>
  );
};
