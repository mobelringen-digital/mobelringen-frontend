import React from "react";

import { Close } from "@/components/_ui/icons/figma/Close";
import { MrColor } from "@/types";
import { CAMPAIGN_COLORS } from "@/utils/helpers";

interface Props {
  content?: string | TrustedHTML | null;
  backgroundColor?: MrColor | null;
  color?: MrColor | null;
  onClose?: () => void;
}

export const Notification: React.FC<Props> = ({
  content,
  backgroundColor,
  color,
  onClose,
}) => {
  return (
    <div
      className="p-2 w-full text-xs flex justify-center items-center relative transition-all duration-300"
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
