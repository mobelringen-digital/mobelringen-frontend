"use client";

import React from "react";

import cx from "classnames";

interface Props {
  isActive: boolean;
}

export const DropdownArrow: React.FC<Props> = ({ isActive }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx("ml-1", {
        "rotate-0": isActive,
        "rotate-180": !isActive,
      })}
    >
      <mask
        id="mask0_1107_1307"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect
          width="20"
          height="20"
          transform="matrix(1 0 0 -1 0 20)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_1107_1307)">
        <path
          d="M10 6.9375L5 11.9375L6.0625 13L10 9.0625L13.9375 13L15 11.9375L10 6.9375Z"
          fill="#1A1110"
        />
      </g>
    </svg>
  );
};
