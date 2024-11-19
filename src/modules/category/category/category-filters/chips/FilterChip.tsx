import React from "react";

interface Props {
  label: string;
  value: string;
  onRemove: () => void;
}

export const FilterChip: React.FC<Props> = ({ label, value, onRemove }) => {
  return (
    <div className="rounded-xl px-3 py-1 lg:py-2 flex items-center text-white bg-brown">
      <span className="mr-2 flex items-center gap-1 text-xs">
        <span className="capitalize flex-shrink-0">{label}:</span> <span>{value}</span>
      </span>
      <button aria-labelledby={label} onClick={onRemove} className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g opacity="0.5">
            <mask
              id="mask0_1434_16159"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1434_16159)">
              <path
                d="M8.4 17L7 15.6L10.6 12L7 8.42502L8.4 7.02502L12 10.625L15.575 7.02502L16.975 8.42502L13.375 12L16.975 15.6L15.575 17L12 13.4L8.4 17Z"
                fill="white"
              />
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
};
