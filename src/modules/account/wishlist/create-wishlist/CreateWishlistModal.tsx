import React from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

import { Button } from "@/components/_ui/button/Button";
import { Input } from "@/components/_ui/input/Input";
import { openToast } from "@/components/_ui/toast-provider";
import { createWishlist } from "@/modules/account/wishlist/actions";
import { WishlistVisibilityEnum } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateWishlistModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [name, setName] = React.useState("");

  const handleCreate = async () => {
    if (!name) return;

    await createWishlist(name, WishlistVisibilityEnum.Private).then(() => {
      openToast({
        content: "Wishlist created",
      });
      onClose();
    });
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      size="2xl"
      className="mx-2"
      backdrop="blur"
    >
      <ModalContent className="bg-white rounded-2xl">
        <ModalHeader className="bg-cream flex items-center px-2 lg:px-5 gap-1">
          Opprett ønskeliste
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleCreate}>
            <label className="text-base font-normal" htmlFor="wishlist-name">
              Navn
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="wishlist-name"
              />
            </label>
          </form>
        </ModalBody>
        <ModalFooter className="flex justify-between px-2 lg:px-5 gap-2 lg:gap-4">
          <Button
            aria-label="Avbryt"
            className="w-full"
            color="tertiary"
            type="button"
            onPress={onClose}
          >
            Avbryt
          </Button>
          <Button
            onPress={handleCreate}
            aria-label="Fortsette"
            className="w-full"
            color="primary"
            type="button"
          >
            Fortsette
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
