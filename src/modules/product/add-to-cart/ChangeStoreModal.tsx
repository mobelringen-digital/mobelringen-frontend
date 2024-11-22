import React from "react";

import { ScrollShadow } from "@nextui-org/react";

import { Button } from "@/components/_ui/button/Button";
import { StatusCircle } from "@/components/_ui/status-circle/StatusCircle";
import { Modal, ModalContent } from "@/components/modal";
import { ProductStoresFragment } from "@/types";

interface Props {
  isOpen: boolean;
  stores: Array<ProductStoresFragment | null>;
  onClose: () => void;
  onStoreChange: (store: ProductStoresFragment | null) => void;
}

export const ChangeStoreModal: React.FC<Props> = ({
  isOpen,
  onClose,
  stores,
  onStoreChange,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Velg butikk">
      <ModalContent>
        <h2 className="text-lg font-semibold mt-4">Din butikk</h2>
        <ScrollShadow className="h-[500px]">
          <ul className="flex flex-col gap-2">
            {stores
              .filter((s) => s?.qty && s.qty > 0)
              .map((store) => {
                return (
                  <li
                    className="flex items-center p-2 rounded-2xl justify-between text-sm hover:bg-dark-grey hover:bg-opacity-5"
                    key={store?.external_id}
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-black font-semibold">
                        {store?.name}
                      </span>

                      <div className="flex gap-1.5 items-center">
                        <StatusCircle variant="green" />
                        <span className="text-dark-grey">
                          {store?.qty} på lager
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 items-center">
                      <Button
                        aria-label="Velg butikk"
                        size="sm"
                        className="h-8"
                        color="secondary"
                        onClick={() => onStoreChange(store)}
                      >
                        Velg butikk
                      </Button>
                    </div>
                  </li>
                );
              })}
          </ul>
        </ScrollShadow>
      </ModalContent>
    </Modal>
  );
};
