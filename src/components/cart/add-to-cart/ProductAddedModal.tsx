import React from "react";

import { useCookies } from "react-cookie";

import Image from "next/image";

import { Button } from "@/components/_ui/button/Button";
import { CrossSellListSlider } from "@/components/cart/add-to-cart/CrossSellListSlider";
import { ModalActions, ModalContent, Modal } from "@/components/modal";
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
      placement="top"
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
        <CrossSellListSlider product={product} selectedStore={selectedStore} />
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
