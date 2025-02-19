import React from "react";

import Link from "next/link";

import { Close } from "@/components/_ui/icons/figma/Close";
import { MrColor } from "@/types";
import { CAMPAIGN_COLORS } from "@/utils/helpers";

interface Props {
  content?: string | TrustedHTML | null;
  backgroundColor?: MrColor | null;
  color?: MrColor | null;
  onClose?: () => void;
  id?: string;
  href?: string | null;
  target?: string;
}

export const Notification: React.FC<Props> = ({
  content,
  backgroundColor,
  color,
  onClose,
  id,
  href,
  target,
}) => {
  if (href) {
    return (
      <div
        id={id}
        className="p-2 w-full flex text-xs justify-center items-center transition-all duration-300 relative z-20"
        style={{
          backgroundColor: CAMPAIGN_COLORS[backgroundColor ?? "MR_powder"],
          color: CAMPAIGN_COLORS[color ?? "MR_black"],
        }}
      >
        <Link className="w-full flex justify-center items-center mr-10" href={href} target={target ? "_blank" : ""}>
          <div
            id="cms-text-block"
            dangerouslySetInnerHTML={{
              __html: content ?? "",
            }}
          />
        </Link>
        <button
          onClick={onClose}
          className="absolute z-30 right-2 top-1/2 transform -translate-y-1/2"
        >
          <Close />
        </button>
      </div>
    );
  }

  return (
    <div
      id={id}
      className="p-2 w-full text-xs flex justify-center items-center transition-all duration-300 relative z-20"
      style={{
        backgroundColor: CAMPAIGN_COLORS[backgroundColor ?? "MR_powder"],
        color: CAMPAIGN_COLORS[color ?? "MR_black"],
      }}
    >
      <div
        id="cms-text-block"
        dangerouslySetInnerHTML={{
          __html: content ?? "",
        }}
      />
      <button
        onClick={onClose}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      >
        <Close />
      </button>
    </div>
  );
};
