import React from "react";

import cx from "classnames";

interface Props {
  topLine?: string | null;
  middleLine?: string | null;
  backgroundColor: string;
  textColor: string;
}

export const SupplementBubble: React.FC<Props> = ({
  topLine,
  middleLine,
  backgroundColor,
  textColor,
}) => {
  return (
    <div
      className={cx(
        "absolute top-0 right-0 -translate-y-3/4 translate-x-1/3 rounded-full rounded-bl-none py-1 px-4",
      )}
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <ul className="flex justify-center items-start flex-col list-none gap-0">
        <li className="text-sm font-medium text-nowrap break-keep">{topLine}</li>
        <li className="text-2xl font-feature font-medium">
          {middleLine}
        </li>
      </ul>
    </div>
  );
};
