import React from "react";

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

export const MinusIcon: React.FC<Props> = ({
  className,
  width = 24,
  height = 24,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <mask
        id="mask0_609_17412"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_609_17412)">
        <path d="M5 13V11H19V13H5Z" fill="#1A1110" />
      </g>
    </svg>
  );
};
