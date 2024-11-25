import React from "react";

import { useCookies } from "react-cookie";

import Image from "next/image";

import { Button } from "@/components/_ui/button/Button";
import { useCrossSellQuery } from "@/components/cart/add-to-cart/useCrossellQuery";
import { ModalActions, ModalContent, Modal } from "@/components/modal";
import { ProductSlider } from "@/components/product-slider/ProductSlider";
import { BaseProductFragment, BaseStoreFragment } from "@/types";

import { navigate } from "../../../app/actions";

interface Props {
  product: BaseProductFragment;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose?: () => void;
  selectedStore?: BaseStoreFragment | null;
}

export const ProductAddedModal: React.FC<Props> = ({
  product,
  isOpen,
  onOpenChange,
  onClose,
  selectedStore,
}) => {
  const [cookies] = useCookies();
  const { data: crossSellProducts } = useCrossSellQuery(
    product.id,
    cookies.preferredMethod,
    selectedStore?.external_id,
  );

  const navigateToCart = async () => {
    if (cookies.preferredMethod) {
      return navigate(`/cart?method=${cookies.preferredMethod}`);
    }
    return navigate("/cart");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      size="4xl"
      title="Lagt til i handlekurv!"
    >
      <ModalContent>
        <div className="grid grid-cols-2 gap-4">
          {product.image?.url ? (
            <div className="relative p-6 lg:p-10 h-[200px] lg:h-[310px] bg-warm-grey rounded-3xl !flex justify-center items-center">
              <Image
                className="object-contain h-[150px] lg:[280px]"
                width={280}
                height={280}
                src={product.image.url}
                alt={product.image.label ?? ""}
              />
            </div>
          ) : null}
          <div className="flex items-start justify-center flex-col gap-1 text-left">
            <p className="text-left text-lg lg:text-xl font-semibold">
              {product.name}
            </p>
            <p
              className="text-xs lg:text-sm font-normal text-dark-grey"
              dangerouslySetInnerHTML={{
                __html: product.short_description?.html ?? "",
              }}
            />
          </div>
        </div>
        {crossSellProducts && crossSellProducts.length > 0 ? (
          <div className="flex flex-col mt-4">
            <ProductSlider
              cardHeight="small"
              nonSliderClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
              sliderConfig={{
                dots: false,
                variableWidth: true,
                adaptiveHeight: true,
                infinite: false,
                arrows: false,
                slidesToScroll: 1,
                responsive: [
                  {
                    breakpoint: 1024,
                    settings: {
                      variableWidth: true,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      variableWidth: true,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      variableWidth: true,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                ],
              }}
              hasAddToCart={true}
              title="Andre har også kjøpt"
              data={crossSellProducts}
            />
          </div>
        ) : null}
      </ModalContent>
      <ModalActions>
        <Button className="w-full" color="secondary" onPress={onOpenChange}>
          Fortsett å handle
        </Button>
        <Button
          className="w-full"
          color="primary"
          onPress={async () => {
            onOpenChange();
            await navigateToCart();
          }}
        >
          Gå til handlekurv
        </Button>
      </ModalActions>
    </Modal>
  );
};
