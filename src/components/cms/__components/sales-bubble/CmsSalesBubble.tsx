import React from "react";

import { CmsSalesBubbleFragment } from "@/types";

interface Props {
  salesBubble: CmsSalesBubbleFragment;
}

export const CmsSalesBubble: React.FC<Props> = ({ salesBubble }) => {
  return (
    <div className="bg-purple-light text-center text-black py-4 px-12 rounded-full rounded-bl-none">
      <ul className="flex justify-center items-center flex-col gap-2 list-none">
        <li className="text-sm lg:text-base font-semibold">
          {salesBubble.topLine}
        </li>
        <li className="text-2xl lg:text-4xl font-feature font-medium">
          {salesBubble.middleLine}
        </li>
        <li className="text-sm lg:text-base font-semibold">
          {salesBubble.bottomLine}
        </li>
      </ul>
    </div>
  );
};
