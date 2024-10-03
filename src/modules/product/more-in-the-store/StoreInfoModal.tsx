import React from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/_ui/button/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreInfoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      className="mx-2"
      backdrop="blur"
    >
      <ModalContent className="bg-white rounded-2xl">
        <>
          <ModalHeader className="bg-cream flex items-center px-2 lg:px-5 gap-1">
            Flere valgmuligheter i butikk
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Image
                width={580}
                height={315}
                src="/more-in-the-store.png"
                alt="More in the store"
                className="mb-4"
              />
              <p>
                For mange av våre produkter tilbyr vi langt flere materialer og
                konfigurasjoner enn de vi har tilgjengelig i nettbutikken.
              </p>
              <p>
                I din lokale butikk kan du selv se og kjenne på de ulike
                materialene. I tillegg vil du kunne snakke med våre dyktige
                fageksperter som kan gi deg gode tips og råd, samt hjelpe deg
                med bestillingen
              </p>
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-center px-2 lg:px-5 gap-2 lg:gap-4">
            <Button
              className="w-full"
              color="secondary"
              as={Link}
              href="/finn-butikk"
            >
              Finn din butikk
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
