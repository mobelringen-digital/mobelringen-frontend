import React from "react";

import cx from "classnames";

import { Favorite } from "@/components/_ui/icons/figma/Favorite";

interface Props {
  productSku?: string | null;
  className?: string;
}

export const AddToWishList: React.FC<Props> = ({ className }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsFavorite((prev) => !prev);
  };

  return (
    <button
      className={cx("p-4 transition-all", className)}
      onClick={handleClick}
    >
      <Favorite
        width={24}
        height={24}
        fill={isFavorite ? "#FF3E3E" : "#1A1110"}
      />
    </button>
  );
};
