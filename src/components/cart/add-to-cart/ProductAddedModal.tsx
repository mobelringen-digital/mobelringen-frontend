import React from "react";

import { Link } from "@nextui-org/link";
import { useCookies } from "react-cookie";

import Image from "next/image";

import { Button } from "@/components/_ui/button/Button";
import { CrossSellListSlider } from "@/components/cart/add-to-cart/cross-sell/CrossSellListSlider";
import { ModalContent, Modal } from "@/components/modal";
import { BaseProductFragment, BaseStoreFragment } from "@/types";

interface Props {
  product: BaseProductFragment;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose?: () => void;
  selectedStore?: BaseStoreFragment | null;
}

const ProductAddedModal: React.FC<Props> = ({
  product,
  isOpen,
  onOpenChange,
  onClose,
  selectedStore,
}) => {
  const [cookies] = useCookies();

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
            <div
              className="text-xs lg:text-sm font-normal text-dark-grey"
              dangerouslySetInnerHTML={{
                __html: product.short_description?.html ?? "",
              }}
            />
          </div>
        </div>
        <div className="flex w-full gap-4 mt-4">
          <Button
            as={Link}
            href={`/${product.canonical_url}`}
            aria-label="Fortsett å handle"
            className="w-full"
            color="secondary"
          >
            Fortsett å handle
          </Button>
          <Button
            as={Link}
            href={`/cart?method=${cookies.preferredMethod}`}
            aria-label="Gå til handlekurv"
            className="w-full"
            color="primary"
          >
            Gå til handlekurv
          </Button>
        </div>

        <CrossSellListSlider product={product} selectedStore={selectedStore} />
      </ModalContent>
    </Modal>
  );
};

export default ProductAddedModal;
