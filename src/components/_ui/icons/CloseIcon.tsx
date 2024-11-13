import React from "react";

interface Props {
  width?: number;
  height?: number;
}

export const CloseIcon: React.FC<Props> = ({ width = "24", height = "24" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="close">
        <mask
          id="mask0_1183_1096"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={width}
          height={height}
        >
          <rect
            id="Bounding box"
            width={width}
            height={height}
            fill="#D9D9D9"
          />
        </mask>
        <g mask="url(#mask0_1183_1096)">
          <path
            id="icon"
            d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
            fill="#1A1110"
          />
        </g>
      </g>
    </svg>
  );
};
