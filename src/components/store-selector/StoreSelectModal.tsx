import React from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { RadioGroup } from "@nextui-org/radio";
import { Checkbox } from "@nextui-org/react";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { RadioBlock } from "@/components/_ui/radio/RadioBlock";
import { setGuestStoreId } from "@/components/store-selector/actions";
import { BaseStoreFragment } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  stores: Array<BaseStoreFragment | null>;
  isAuthorized: boolean;
  selectedStore?: BaseStoreFragment | null;
}

export const StoreSelectModal: React.FC<Props> = ({
  isOpen,
  onClose,
  stores,
  selectedStore,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [store, setStore] = React.useState<string | undefined>(
    selectedStore?.external_id ?? undefined,
  );

  const submitStore = async () => {
    if (!store) return;

    setIsLoading(true);
    return setGuestStoreId(store).finally(() => {
      setIsLoading(false);
      onClose();
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      className="mx-2"
      backdrop="blur"
    >
      {isLoading ? <PageTopLoader /> : null}
      <ModalContent className="bg-white rounded-2xl">
        <form>
          <ModalHeader className="bg-cream text-3xl font-feature font-medium flex items-center px-2 lg:px-5 gap-1">
            Velg butikk
          </ModalHeader>
          <ModalBody>
            <h2 className="text-lg font-semibold mt-4">Din butikk</h2>
            {selectedStore ? (
              <div className="flex justify-between border-y border-cold-grey-dark py-2">
                <div className="flex flex-col">
                  <p className="font-semibold">{selectedStore?.name}</p>
                  <p className="text-dark-grey">
                    {`${selectedStore?.street}, ${selectedStore?.postcode} ${selectedStore?.city}`}
                  </p>
                </div>
                <div className="bg-powder flex rounded-2xl px-4 py-2 items-center gap-2">
                  <Checkbox
                    className="font-medium"
                    title="Min butikk"
                    isSelected={true}
                  >
                    Min butikk
                  </Checkbox>
                </div>
              </div>
            ) : null}

            <div className="max-h-64 overflow-y-auto">
              <RadioGroup
                value={store}
                onValueChange={setStore}
                color="primary"
              >
                {stores.map((storeData) => (
                  <RadioBlock
                    key={storeData?.external_id}
                    value={storeData?.external_id ?? ""}
                  >
                    {storeData?.name}
                  </RadioBlock>
                ))}
              </RadioGroup>
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-end px-2 lg:px-5 gap-2 lg:gap-4">
            <Button
              disabled={!selectedStore}
              onClick={submitStore}
              color="primary"
            >
              Fortsette
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
