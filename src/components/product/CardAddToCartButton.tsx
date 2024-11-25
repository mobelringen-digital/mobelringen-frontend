"use client";

import React from "react";

import { useCookies } from "react-cookie";

import { useSearchParams } from "next/navigation";

import { Loader } from "@/components/_ui/loader/Loader";
import { openToast } from "@/components/_ui/toast-provider";
import { addItemToCartHandler } from "@/components/cart/add-to-cart/actions";
import { addToCartGTMEvent } from "@/components/cart/add-to-cart/AddToCart";
import { BaseProductFragment, DeliveryType } from "@/types";

interface Props {
  product: BaseProductFragment;
}

export const CardAddToCartButton: React.FC<Props> = ({ product }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const [cookies] = useCookies();
  const activeMethod =
    cookies.preferredMethod ??
    searchParams.get("preferredMethod") ??
    DeliveryType.Online;

  const handleAddItemToCart = async (preferredMethod: DeliveryType) => {
    if (isLoading) return;
    setIsLoading(true);
    return addItemToCartHandler(product, preferredMethod, 1)
      .then((data) => {
        if (data?.addProductsToCart?.user_errors) {
          data.addProductsToCart.user_errors.forEach((error) => {
            return openToast({ content: error?.message });
          });
        }

        addToCartGTMEvent(preferredMethod, product, 1);
        openToast({ content: "Produktet er lagt i handlekurven" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <button
      aria-label="Add to cart"
      className="w-[40px] h-[40px] flex flex-shrink-0"
      onClick={() => handleAddItemToCart(activeMethod)}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
              fill="#1A1110"
            />
            <mask
              id="mask0_4_22586"
              maskUnits="userSpaceOnUse"
              x="8"
              y="8"
              width="24"
              height="24"
            >
              <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_4_22586)">
              <path
                d="M14.3077 29.5C13.8026 29.5 13.375 29.325 13.025 28.975C12.675 28.625 12.5 28.1974 12.5 27.6923V16.3077C12.5 15.8026 12.675 15.375 13.025 15.025C13.375 14.675 13.8026 14.5 14.3077 14.5H16.25V14.25C16.25 13.2141 16.616 12.3301 17.3481 11.5981C18.0801 10.866 18.9641 10.5 20 10.5C21.0359 10.5 21.9198 10.866 22.6519 11.5981C23.3839 12.3301 23.75 13.2141 23.75 14.25V14.5H25.6922C26.1974 14.5 26.625 14.675 26.975 15.025C27.325 15.375 27.5 15.8026 27.5 16.3077V27.6923C27.5 28.1974 27.325 28.625 26.975 28.975C26.625 29.325 26.1974 29.5 25.6922 29.5H14.3077ZM14.3077 28H25.6922C25.7692 28 25.8397 27.9679 25.9038 27.9038C25.9679 27.8397 26 27.7692 26 27.6923V16.3077C26 16.2308 25.9679 16.1602 25.9038 16.0961C25.8397 16.032 25.7692 16 25.6922 16H23.75V18.25C23.75 18.4628 23.6782 18.641 23.5346 18.7846C23.391 18.9282 23.2128 19 23 19C22.7872 19 22.609 18.9282 22.4654 18.7846C22.3218 18.641 22.25 18.4628 22.25 18.25V16H17.7499V18.25C17.7499 18.4628 17.6782 18.641 17.5346 18.7846C17.391 18.9282 17.2128 19 17 19C16.7872 19 16.609 18.9282 16.4654 18.7846C16.3218 18.641 16.25 18.4628 16.25 18.25V16H14.3077C14.2308 16 14.1602 16.032 14.0961 16.0961C14.032 16.1602 14 16.2308 14 16.3077V27.6923C14 27.7692 14.032 27.8397 14.0961 27.9038C14.1602 27.9679 14.2308 28 14.3077 28ZM17.7499 14.5H22.25V14.25C22.25 13.6231 22.0317 13.0913 21.5952 12.6548C21.1586 12.2183 20.6269 12 20 12C19.373 12 18.8413 12.2183 18.4048 12.6548C17.9682 13.0913 17.7499 13.6231 17.7499 14.25V14.5Z"
                fill="white"
              />
            </g>
          </svg>
        </>
      )}
    </button>
  );
};
