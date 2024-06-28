import React from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

import Image from "next/image";

import { Button } from "@/components/_ui/button/Button";
import { BaseProductFragment } from "@/types";

interface Props {
  product: BaseProductFragment;
  isOpen: boolean;
  onOpenChange: () => void;
}

export const ProductAddedModal: React.FC<Props> = ({
  product,
  isOpen,
  onOpenChange,
}) => {
  return (
    <Modal
      size="2xl"
      className="mx-2"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="bg-white rounded-2xl">
        {(onClose) => (
          <>
            <ModalHeader className="bg-cream flex items-center px-2 lg:px-5 gap-1">
              Lagt til i handlekurv!
            </ModalHeader>
            <ModalBody className="py-6 px-2 lg:px-5">
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
                  <p
                    className="text-xs lg:text-sm font-normal text-dark-grey"
                    dangerouslySetInnerHTML={{
                      __html: product.short_description?.html ?? "",
                    }}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-between px-2 lg:px-5 gap-2 lg:gap-4">
              <Button className="w-full" color="secondary" onPress={onClose}>
                Fortsett å handle
              </Button>
              <Button className="w-full" color="primary" onPress={onClose}>
                Gå til handlekurv
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
