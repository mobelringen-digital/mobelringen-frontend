"use client";

import { useQueryClient } from "@tanstack/react-query";

export const AddToCart = () => {
  const queryClient = useQueryClient();

  return (
    <button
      onClick={() =>
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        })
      }
    >
      Add to cart
    </button>
  );
};
