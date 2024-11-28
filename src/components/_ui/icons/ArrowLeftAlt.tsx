import React from "react";

interface Props {
  id?: string;
}

export const ArrowLeftAlt: React.FC<Props> = ({ id = "arrow-left-alt" }) => {
  return (
    <svg
      id={id}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id={id}>
        <mask
          id={`mask0_${id}`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <rect id={id} width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask={`url(#mask0_${id})`}>
          <path
            id="icon"
            d="M10 18L4 12L10 6L11.4 7.45L7.85 11H20V13H7.85L11.4 16.55L10 18Z"
            fill="#1A1110"
          />
        </g>
      </g>
    </svg>
  );
};
