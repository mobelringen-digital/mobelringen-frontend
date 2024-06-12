import React from "react";

interface Props {
  width?: number;
  height?: number;
}

export const PlusIcon: React.FC<Props> = ({ width = 24, height = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <mask
        id="mask0_609_16262"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={width}
        height={height}
      >
        <rect width={width} height={height} fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_609_16262)">
        <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="#1A1110" />
      </g>
    </svg>
  );
};
