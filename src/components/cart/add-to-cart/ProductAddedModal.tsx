import React from "react";

import { useCookies } from "react-cookie";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/_ui/button/Button";
import { ModalActions, ModalContent, Modal } from "@/components/modal";
import { BaseProductFragment } from "@/types";

interface Props {
  product: BaseProductFragment;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose?: () => void;
}

const ProductAddedModal: React.FC<Props> = ({
  product,
  isOpen,
  onOpenChange,
  onClose,
}) => {
  const [cookies] = useCookies();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      title="Lagt til i handlekurv!"
    >
      <ModalContent>
        <div className="grid grid-cols-2 gap-4 lg:gap-8">
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
      </ModalContent>
      <ModalActions>
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
      </ModalActions>
    </Modal>
  );
};

export default ProductAddedModal;
