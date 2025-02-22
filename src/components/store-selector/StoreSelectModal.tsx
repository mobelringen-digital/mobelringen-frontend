import React from "react";

import { RadioGroup } from "@nextui-org/radio";
import { Checkbox } from "@nextui-org/react";
import { useDebounce } from "use-debounce";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { RadioBlock } from "@/components/_ui/radio/RadioBlock";
import { useStoresList } from "@/components/cms/block-stores-map/useStoresList";
import { Modal, ModalActions, ModalContent } from "@/components/modal";
import { SearchInput } from "@/components/search/SearchInput";
import { setFavoriteStoreId } from "@/components/store-selector/actions";
import { BaseStoreFragment } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedStore?: BaseStoreFragment | null;
}

const StoreSelectModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedStore,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [store, setStore] = React.useState<string | undefined>(
    selectedStore?.external_id ?? undefined,
  );
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [value] = useDebounce(searchValue, 500);
  const {
    data: stores,
    isLoading: isStoresLoading,
    isFetching,
  } = useStoresList({
    searchInput: value || "",
  });

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const submitStore = async () => {
    if (!store) return;

    setIsLoading(true);
    return setFavoriteStoreId(store).finally(() => {
      setIsLoading(false);
      setSearchValue("");
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Velg butikk" className="h-[650px]">
      {isLoading ? <PageTopLoader /> : null}
      <form className="flex justify-between flex-col h-full">
        <ModalContent>
          <h2 className="text-lg font-semibold mt-4">Din butikk</h2>
          {selectedStore ? (
            <div className="flex justify-between text-xs lg:text-base border-y border-cold-grey-dark py-2">
              <div className="flex flex-col">
                <p className="font-semibold">{selectedStore?.name}</p>
                <p className="text-dark-grey">
                  {`${selectedStore?.street}, ${selectedStore?.postcode} ${selectedStore?.city}`}
                </p>
              </div>
              <div className="bg-powder flex rounded-2xl px-4 py-2 items-center gap-2">
                <Checkbox
                  className="font-medium text-xs lg:text-bas"
                  title="Min butikk"
                  isSelected={true}
                >
                  Min butikk
                </Checkbox>
              </div>
            </div>
          ) : null}

          <div className="border-b pt-2 pb-4 border-cold-grey-dark">
            <SearchInput
              onChange={onSearchChange}
              variant="bordered"
              placeholder="Postnummer eller butikknavn"
            />
          </div>

          <div className="max-h-64 overflow-y-auto">
            {isStoresLoading || isFetching ? (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-warm-grey rounded-lg h-12 w-full mt-3 block"
                  />
                ))}
              </>
            ) : null}
            <RadioGroup value={store} onValueChange={setStore} color="primary">
              {stores?.map((storeData) => (
                <RadioBlock
                  key={storeData?.external_id}
                  value={storeData?.external_id ?? ""}
                >
                  {storeData?.name}
                </RadioBlock>
              ))}
            </RadioGroup>
          </div>
        </ModalContent>
        <ModalActions position="end">
          <Button
            aria-label="Fortsette"
            disabled={!store || isLoading}
            onPress={submitStore}
            color="primary"
          >
            Fortsette
          </Button>
        </ModalActions>
      </form>
    </Modal>
  );
};

export default StoreSelectModal;
